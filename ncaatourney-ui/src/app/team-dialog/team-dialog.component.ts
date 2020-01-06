import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Team } from '../admin/admin.component';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css']
})
export class TeamDialogComponent {
  constructor(private dialogRef: MatDialogRef<TeamDialogComponent>,  @Inject(MAT_DIALOG_DATA) public team: Team) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
