import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SingInRequest, SingInResponse } from '../models/SingIn';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  SingIn(body:SingInRequest){
    return this.http.post<SingInResponse>(`${this.apiUrl}/Login`,body);
  }

}
