import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountform',
  templateUrl: './accountform.component.html',
  styleUrls: ['./accountform.component.css']
})
export class AccountformComponent implements OnInit {
  newUser: PoolUser = new PoolUser();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  saveUser(){
    sessionStorage.setItem("authenticatedUser", this.newUser.displayName);
    this.userService.saveUser(this.newUser).subscribe(user =>{
      sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
      this.router.navigateByUrl("/userportal");
    });
  }

}

export class PoolUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  admin: boolean = false;
  score: number = 0;
  password: string;
}
