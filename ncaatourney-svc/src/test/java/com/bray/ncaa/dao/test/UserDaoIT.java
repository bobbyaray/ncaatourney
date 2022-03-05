package com.bray.ncaa.dao.test;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.model.PoolUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserDaoIT {
    @Autowired
    private PoolUserRepository userRepository;

    @Test
    public void testUserDAO(){
        PoolUser newUser = new PoolUser();
        newUser.setEmail("someone@gmail.com");
        newUser.setDisplayName("Someone");
        newUser.setFirstName("Some");
        newUser.setLastName("One");
        newUser.setPassword("password");

        userRepository.save(newUser);

        // Now retrieve
        List<PoolUser> users = userRepository.findAll();
        assertEquals(1, users.size());

        // Retrieve by ID
        String userID = users.get(0).getId();
        PoolUser myuser = userRepository.findById(userID).get();
        assertEquals("someone@gmail.com", myuser.getEmail());

        // Now add another user
        newUser = new PoolUser();
        newUser.setEmail("someone2@gmail.com");
        newUser.setDisplayName("Someone2");
        newUser.setFirstName("Some");
        newUser.setLastName("One2");
        newUser.setPassword("password");
        userRepository.save(newUser);

        // Now retrieve again
        users = userRepository.findAll();
        assertEquals(2, users.size());

        // Now delete the user we added
        userRepository.delete(newUser);

        // Now retrieve again
        users = userRepository.findAll();
        assertEquals(1, users.size());

        // Now delete all
        userRepository.deleteAll();

        // Now retrieve again
        users = userRepository.findAll();
        assertEquals(0, users.size());
    }
}
