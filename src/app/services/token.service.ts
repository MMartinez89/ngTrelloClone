import { Injectable } from '@angular/core';
import {getCookie, setCookie, removeCookie} from 'typescript-cookie';
import jwt_decode from 'jwt-decode';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    //const lc =localStorage.setItem('token', token);
    //const cookkie = setCookie('token-trello', token, { expires: 365, path: '/'});
    //console.log(token)
    if (typeof window !== "undefined") {
      setCookie('token-trello', token, { expires: 365, path: '/'});
    }
  }

  getToken(){
    //const token = localStorage.getItem('token');
    let token;
    if (typeof window !== "undefined") {
       token = getCookie('token-trello' );
    }
    return token;
    
  }

  removeToken(){
    //const lc = localStorage.removeItem('token');
    if (typeof window !== "undefined") {
      console.log('removeToken');
      removeCookie('token-trello');
    }
  }

  saveRefreshToken(token: string){
    if (typeof window !== "undefined") {
      setCookie('refresh-token-trello', token, { expires: 365, path: '/'});
    }
  }

  getRefreshToken(){
    let token;
    if (typeof window !== "undefined") {
       token = getCookie('refresh-token-trello' );
    }
    return token;
    
  }

  removeRefreshToken(){
    if (typeof window !== "undefined") {
      removeCookie('refresh-token-trello');
    }
  }

  isValidToken(){
    const token =  this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      console.log("TokenDate",tokenDate)
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken(){
    const token =  this.getRefreshToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      console.log("TokenDate",tokenDate)
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
