import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatOptionModule, MatSelectModule, MatInputModule  } from  '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule } from '@angular/forms';
import { AccountformComponent } from './accountform/accountform.component';
import { MakepicksComponent } from './makepicks/makepicks.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    AccountformComponent,
    MakepicksComponent
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
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
