import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetStatusTaskResponse } from '../models/StatusTask';

@Injectable({
  providedIn: 'root'
})
export class StatusTaskService {

  apiUrl:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  GetStatusTask(){
    return this.http.get<GetStatusTaskResponse[]>(`${this.apiUrl}/StatusTask`);
  }
}
