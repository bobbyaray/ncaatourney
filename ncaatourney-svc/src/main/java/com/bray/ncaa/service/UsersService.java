package com.bray.ncaa.service;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.TourneyState;
import com.bray.ncaa.model.UserLogin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UsersService {
    @Autowired
    private PoolUserRepository userRepository;

    @Autowired
    private PoolStateService poolStateService;

    @Autowired
    private StandingsService standingsService;

    public List<PoolUser> getAllPoolUsers(){
        return userRepository.findAll();
    }

    public PoolUser getPoolUser(String userID){
        log.info("Querying user: {}", userID);
        return userRepository.findById(userID).get();
    }

    public PoolUser getPoolUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void deleteAllUsers(){
        userRepository.deleteAll();
    }

    public void deleteUser(String userID){
        log.info("Deleting user: {}", userID);
        userRepository.deleteById(userID);
    }

    public PoolUser saveUser(PoolUser user){
        PoolState state = poolStateService.getCurrentState();
        log.info("Tourney State: {}", state.getState());

        if(user.getId() != null) {
            log.info("Updating user: {}", user);

            PoolUser currentUser = this.getPoolUser(user.getId());
            currentUser.setDisplayName(user.getDisplayName());

            // User picks cannot be updated unless tourney state is USER_PICKS
            if(state.getState() == TourneyState.USER_PICKS) {
                currentUser.setSeed_01(user.getSeed_01());
                currentUser.setSeed_02(user.getSeed_02());
                currentUser.setSeed_03(user.getSeed_03());
                currentUser.setSeed_04(user.getSeed_04());
                currentUser.setSeed_05(user.getSeed_05());
                currentUser.setSeed_06(user.getSeed_06());
                currentUser.setSeed_07(user.getSeed_07());
                currentUser.setSeed_08(user.getSeed_08());
                currentUser.setSeed_09(user.getSeed_09());
                currentUser.setSeed_10(user.getSeed_10());
                currentUser.setSeed_11(user.getSeed_11());
                currentUser.setSeed_12(user.getSeed_12());
                currentUser.setSeed_13(user.getSeed_13());
                currentUser.setSeed_14(user.getSeed_14());
                currentUser.setSeed_15(user.getSeed_15());
                currentUser.setSeed_16(user.getSeed_16());
            }

            PoolUser updatedUser = userRepository.save(currentUser);

            if (state.getState() == TourneyState.TOURNEY) {
                // Update the tourney page if user updates name
                standingsService.updateStandings();
            }

            return updatedUser;
        }

        // New user. Verify email and display name are unique.
        if (state.getState() == TourneyState.TOURNEY) {
            throw new RuntimeException("No new registration after tournament has started");
        }

        List<PoolUser> allUsers = getAllPoolUsers();
        for(PoolUser poolUser: allUsers) {
            if(poolUser.getEmail().equals(user.getEmail())) {
                throw new RuntimeException("Email " + user.getEmail() + " already exists.");
            }
            if(user.getDisplayName() != null &&
                    poolUser.getDisplayName().equals(user.getDisplayName())) {
                throw new RuntimeException("Display name " + user.getDisplayName() + " is already taken.");
            }
        }

        if(user.getDisplayName() == null || user.getDisplayName().isEmpty()) {
            user.setDisplayName(user.getFirstName() + " " + user.getLastName());
        }

        log.info("Saving user: {}", user);
        return userRepository.save(user);
    }

    public PoolUser processUserLogin(UserLogin userLogin) {
        log.info("User logging in {}", userLogin);
        PoolState state = poolStateService.getCurrentState();
        if(state.getState() == TourneyState.ADMIN_PICKS) {
            throw new RuntimeException("Admin is setting up the tournament. Check back later.");
        }

        PoolUser user = this.getPoolUserByEmail(userLogin.getEmail());
        if(user != null && user.getPassword().equals(userLogin.getPassword())) {
            return user;
        }

        throw new RuntimeException("User not found or password incorrect");
    }
}
