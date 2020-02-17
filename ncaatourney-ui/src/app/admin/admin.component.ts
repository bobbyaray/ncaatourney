import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { AdminserviceService } from '../adminservice.service';
import { PoolUser } from '../accountform/accountform.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  team: Team = new Team();
  poolState: PoolState = new PoolState();
  tourneyState: string;

  teamColumns: string[] = ['seed', 'name', 'options'];
  userColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'displayName', 'admin', 'options'];
  dataSource: Array<Team>;
  userDataSource: Array<PoolUser>;

  constructor(public dialog: MatDialog, private adminService: AdminserviceService, private userService: UserService) {}

  openTeamDialog(teamId: string) {
    if(teamId){
      this.adminService.getTeam(teamId).subscribe(foundTeam => {
        this.openDialog(foundTeam);
      });
    }else{
      this.openDialog(new Team());
    }
  }

  openDialog(foundTeam: Team){
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '250px',
      data: {
        id: foundTeam.id,
        alive: foundTeam.alive,
        name: foundTeam.name, 
        seed: foundTeam.seed, 
        score64: foundTeam.score64,
        score32: foundTeam.score32,
        score16: foundTeam.score16,
        score8: foundTeam.score8,
        score4: foundTeam.score4,
        score2: foundTeam.score2
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.saveTeam(result);
      }
    });
  }

  loadTeam(teamId: string){
    this.adminService.getTeam(teamId).subscribe(foundTeam => this.team = foundTeam);
  }

  ngOnInit() {
    this.setPoolState();
    this.loadTeams();
    this.loadUsers();
    this.tourneyState = this.poolState.state + "";
  }

  setPoolState(){
    this.adminService.getPoolState().subscribe(state => {
      this.poolState = state;
    });
  }

  updatePoolState(){
    this.adminService.updatePoolState(this.poolState).subscribe();
  }

  saveTeam(team: Team){
    this.adminService.saveTeam(team).subscribe(() => this.loadTeams());
  }

  loadTeams(){
    this.adminService.getTeams().subscribe(teams => {
      this.dataSource = teams;
    });
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(users => {
      this.userDataSource = users;
    })
  }

  deleteTeam(id: string){
      this.adminService.deleteTeam(id).subscribe(() => this.loadTeams());
  }

  deleteUser(id: string){
    var deleteUser = confirm("Are you sure you want to delete this user?");
    if(deleteUser){
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

}

export class Team {
    id: string;
    name: string;
    seed: number;
    alive: boolean = true;
    score64: number = 0;
    score32: number = 0;
    score16: number = 0;
    score8: number = 0;
    score4: number = 0;
    score2: number = 0;
}

export class PoolState {
  id: string;
  state: string;
  tourneyYear: number;
}
