import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PoolState } from './admin/admin.component';
import { Team } from './admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  getPoolState(): Observable<PoolState>{
    return this.http.get<PoolState>("/pool");
  }

  updatePoolState(state: PoolState): Observable<Object>{
    return this.http.post("/pool", state, this.httpOptions);
  }

  saveTeam(team: Team): Observable<Object>{
    // Make the call to save the team
    return this.http.post("/teams", team, this.httpOptions);
  }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>("/teams/list");
  }

  deleteTeam(id: string): Observable<Object>{
    return this.http.delete("teams?teamID=" + id);
  }

  getTeam(id: string): Observable<Team>{
    return this.http.get<Team>("/teams?teamID=" + id);
  }
}
