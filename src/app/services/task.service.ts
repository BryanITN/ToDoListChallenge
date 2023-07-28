import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUpdateTask, GetTaskResponse } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  CreateTask(body:CreateUpdateTask){
    return this.http.post(`${this.apiUrl}/Task`,body);
  }

  UpdateTask(body:CreateUpdateTask,id:number){
    return this.http.put(`${this.apiUrl}/Task/${id}`,body);
  }

  DeleteTask(id:number){
    return this.http.delete(`${this.apiUrl}/Task/${id}`);
  }
  GetAllTaskByUser(userId:number){
    return this.http.get<GetTaskResponse>(`${this.apiUrl}/Task?userId=${userId}`);
  }
  GetTaskById(id:number){
    return this.http.get<GetTaskResponse>(`${this.apiUrl}/Task/${id}`);
  }
}
