import { Component, OnInit } from '@angular/core';
import { PoolUser } from '../accountform/accountform.component';
import { PoolState } from '../admin/admin.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  error: string;
  user: PoolUser;

  email: string;
  password: string;

  constructor(private adminService: AdminserviceService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.adminService.getPoolState().subscribe(poolState => {
      if(poolState.state == "TOURNEY"){
        //Forward to the Tourney Page
        this.router.navigateByUrl("/tourney");
      }else{
        this.verifyUser();
        if(this.user){
          //User already authenticated, forward to the User Portal
          this.router.navigateByUrl("/userportal");
        }
      }
    });
  }

  verifyUser(){
    var authUser = sessionStorage.getItem("authenticatedUser");
    if(authUser) this.user = JSON.parse(authUser);
  }

  authenticateUser(){
    this.userService.getUserByEmail(this.email).subscribe(user => {
      if(user){
        if(user.password == this.password){
          //User validated, set session
          sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
          this.router.navigateByUrl("/userportal");
        }else{
          this.error = "Incorrect password";
        }
      }else{
        this.error = "User email not found";
      }
    }); 
  }

}
