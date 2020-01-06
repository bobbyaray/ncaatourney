import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatOptionModule, MatDialogModule, MatSelectModule, MatInputModule  } from  '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import { AccountformComponent } from './accountform/accountform.component';
import { MakepicksComponent } from './makepicks/makepicks.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdminComponent } from './admin/admin.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    AccountformComponent,
    MakepicksComponent,
    AdminComponent,
    TeamDialogComponent
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
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TeamDialogComponent]
})
export class AppModule { }
