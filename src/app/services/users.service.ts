import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from './../../environments/environment'
import { TokenService } from './token.service';
import {User} from './../models/user.model'
import {checkToken} from './../interceptors/token.interceptor'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  private token = inject(TokenService)

  constructor() { }

  getUsers(){
    //const token = this.token.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, { context: checkToken()}
     /* headers: {
        Authorization: `Bearer ${token}`
      }
    }*/);
  }
}
