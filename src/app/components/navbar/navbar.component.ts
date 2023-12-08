import { Component } from '@angular/core';
import {BtnComponent} from './../btn/btn.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBell, faInfoCircle, faClose} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  fabell = faBell;
  faInfoCircle = faInfoCircle;
  faClose= faClose;

  isOpen:boolean = false;
  isOpenBody: boolean =  false;

}
