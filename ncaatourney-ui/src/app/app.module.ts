import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatOptionModule, MatDialogModule, MatSelectModule, MatInputModule, MatSlideToggleModule  } from  '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import { AccountformComponent } from './accountform/accountform.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdminComponent } from './admin/admin.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule } from '@angular/common/http';
import { UserportalComponent } from './userportal/userportal.component';
import { TourneyComponent } from './tourney/tourney.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    AccountformComponent,
    AdminComponent,
    TeamDialogComponent,
    UserportalComponent,
    TourneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TeamDialogComponent]
})
export class AppModule { }
