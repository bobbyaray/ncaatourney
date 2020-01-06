import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { PoolState } from './admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http:HttpClient) { }

  getPoolState(): Observable<PoolState>{
    return this.http.get<PoolState>("/pool");
  }

  updatePoolState(state: PoolState): Observable<Object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post("/pool", state, httpOptions);
  }
}
