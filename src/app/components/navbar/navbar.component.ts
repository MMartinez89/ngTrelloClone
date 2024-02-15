import { Component, inject } from '@angular/core';
import {BtnComponent} from './../btn/btn.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBell, faInfoCircle, faClose} from '@fortawesome/free-solid-svg-icons'
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import {RouterLinkWithHref} from '@angular/router'
import { User } from '../../models/user.model';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private tokenService = inject(TokenService)

  
  fabell = faBell;
  faInfoCircle = faInfoCircle;
  faClose= faClose;

  isOpen:boolean = false;
  isOpenBody: boolean =  false;

  user: User | null = null;

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user =>{
      this.user = user;
    })
    );
    //this.authService.getProfile().subscribe();// asi fuera reactivo si existiera un componente que englobe todo
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
    console.log('aqui')
  }

  isValidToken(){
    console.log(this.tokenService.isValidToken());
  }

}
