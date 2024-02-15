import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import{FormBuilder, Validators} from '@angular/forms';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {BtnComponent} from '../../btn/btn.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {BackgroundComponent} from './../background/background.component';
import {AuthService} from '../../../services/auth.service';
import {RequestStatus} from '../../../models/request-status.model'
import Swal from 'sweetalert2'
import {RouterLinkWithHref} from '@angular/router'



@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [FontAwesomeModule, BtnComponent, ReactiveFormsModule, CommonModule, HeaderComponent, FooterComponent, BackgroundComponent, RouterLinkWithHref],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {

  private authServive = inject(AuthService);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authServive.recovery(email).subscribe({
        next: () =>{
         this.status = 'success',
         this.emailSent = true;
        },
        error: (err) =>{
          console.log(err)
          this.status = 'failed';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
