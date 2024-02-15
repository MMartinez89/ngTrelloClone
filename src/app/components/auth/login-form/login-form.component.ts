import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {BtnComponent} from '../../btn/btn.component';
import {AuthService} from '../../../services/auth.service'
import {RequestStatus} from '../../../models/request-status.model'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, BtnComponent, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private authService = inject(AuthService)
  private route = inject(ActivatedRoute);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.route.queryParamMap.subscribe(params =>{
      const email = params.get('email');
      if(email){
        this.form.controls.email.setValue(email)
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next:() =>{
          this.status = 'success';
          this.router.navigate((['/board']));
        },
        error: () =>{
          this.status = 'failed';
          Swal.fire({
            title: 'Error!',
            text: 'Credentials are invalid',
            icon: 'error',
            confirmButtonText: 'Exit'
          })
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
