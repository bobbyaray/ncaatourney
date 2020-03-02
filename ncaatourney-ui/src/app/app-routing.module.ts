import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { AccountformComponent } from './accountform/accountform.component';
import { AdminComponent } from './admin/admin.component';
import { UserportalComponent } from './userportal/userportal.component';
import { TourneyComponent } from './tourney/tourney.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LoginformComponent},
  {path: 'createaccount', component: AccountformComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'userportal', component: UserportalComponent},
  {path: 'tourney', component: TourneyComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
