import { CanActivateFn, Router } from '@angular/router';
import {TokenService} from '../services/token.service'
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  //const token: string | unknown = inject(TokenService).getToken();
  const isValidToken: string | unknown = inject(TokenService).isValidRefreshToken();

  if(!isValidToken){
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};






