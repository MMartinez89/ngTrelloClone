import { Component } from '@angular/core';
import {BtnComponent} from '../../components/btn/btn.component'
import {HeaderComponent} from '../../components/auth/header/header.component'
import {FooterComponent} from '../../components/auth/footer/footer.component';
import {LoginFormComponent} from '../../components/auth/login-form/login-form.component'
import {BackgroundComponent} from '../../components/auth/background/background.component';
import {RouterLinkWithHref} from '@angular/router'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BtnComponent, HeaderComponent, FooterComponent, LoginFormComponent, BackgroundComponent, RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
