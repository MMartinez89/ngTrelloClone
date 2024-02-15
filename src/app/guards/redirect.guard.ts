import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';


export const redirectGuard: CanActivateFn = () => {
  //const token: string | unknown = inject(TokenService).getToken();
  const isTokenValid: string | unknown = inject(TokenService).isValidRefreshToken();
  const router = inject(Router);

  if(isTokenValid){
    router.navigate(['/board']);
    //const url = router.createUrlTree(['/board']);
    //return url;
    return false;
  }
  return true;
};

