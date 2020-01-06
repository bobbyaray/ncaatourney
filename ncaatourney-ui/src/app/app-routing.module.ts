import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { AccountformComponent } from './accountform/accountform.component';
import { MakepicksComponent } from './makepicks/makepicks.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LoginformComponent},
  {path: 'createaccount', component: AccountformComponent},
  {path: 'makepicks', component: MakepicksComponent},
  {path: 'admin', component: AdminComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
