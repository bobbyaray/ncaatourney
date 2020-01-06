import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  team: Team = new Team();
  poolState: PoolState = new PoolState();

  constructor(public dialog: MatDialog, private adminService: AdminserviceService) {}

  openAddTeamDialog() {
        const dialogRef = this.dialog.open(TeamDialogComponent, {
          width: '250px',
          data: {name: this.team.name, seed: this.team.seed}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result){
            alert(result.name);
            alert(result.seed);
          }

          // Do something with the new team
        });
  }

  ngOnInit() {
    this.setPoolState();
  }

  setPoolState(){
    this.adminService.getPoolState().subscribe(state => {
      this.poolState = state;
    });
  }

  updatePoolState(){
    this.adminService.updatePoolState(this.poolState).subscribe();
  }

}

export class Team {
    name: string;
    seed: number;
}

export class PoolState {
  id: string;
  tourneyStarted: boolean;
  readyForPicks: boolean;
  tourneyYear: number;
}
