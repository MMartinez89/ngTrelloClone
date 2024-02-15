import { Component } from '@angular/core';
import {BackgroundComponent} from '../../components/auth/background/background.component'
import {RegisterFormComponent} from './../../components/auth/register-form/register-form.component'
import {HeaderComponent} from './../../components/auth/header/header.component'
import {FooterComponent} from './../../components/auth/footer/footer.component'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BackgroundComponent, RegisterFormComponent, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
