import { Injectable, inject } from '@angular/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import {environment} from '../../environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import {TokenService} from './token.service';
import {ResponseLogin} from '../models/auth.model';
import {User} from './../models/user.model'
import { BehaviorSubject } from 'rxjs';
import {checkToken} from './../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null) //Obserbable que guarda el estado del usuario

  private tokenService = inject(TokenService)

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`,{
      email,
      password
    })
    .pipe(
      tap(response =>{ //genera una accion secundaria sin alterar el observable, se hace antes de responder la operacion que se hace con login 
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }

  refreshToken(refreshToken: string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`,{refreshToken})
    .pipe(
      tap(response =>{ //genera una accion secundaria sin alterar el observable, se hace antes de responder la operacion que se hace con login 
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
  }

  register(email: string, password: string, name: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`,{
      email,
      password,
      name
    })
  }

  registerAndLogin(email: string, password: string, name: string){
    return this.register(email, password, name).pipe(switchMap(() => this.login(email,password))); //switchMap valida si la funcion anterior fue exitosa
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`,{
      email
    })
  }

  recovery(email: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`,{
      email
    })
  }

  changePassword(token: string, newPassword: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`,{
      token,
      newPassword
    })
  }


  logOut(){
    this.tokenService.removeToken();
  }

  getProfile(){
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`,{ context: checkToken()}
   /*   headers: {
        Authorization: `Bearer ${token}`
      }
    }*/).pipe(
      tap(user =>{
        this.user$.next(user);
      })
    )
  }

}
