import { Component } from '@angular/core';
import {BackgroundComponent} from './../../components/auth/background/background.component';
import {HeaderComponent} from '../../components/auth/header/header.component';
import {ForgotPasswordFormComponent} from './../../components/auth/forgot-password-form/forgot-password-form.component';
import {FooterComponent} from './../../components/auth/footer/footer.component';
import {RouterLinkWithHref} from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BackgroundComponent, HeaderComponent, ForgotPasswordFormComponent, FooterComponent, RouterLinkWithHref],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

}
