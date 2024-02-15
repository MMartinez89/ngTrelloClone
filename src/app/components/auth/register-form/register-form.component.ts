import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BtnComponent} from '../../btn/btn.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HeaderComponent} from '../../auth/header/header.component';
import {FooterComponent} from '../footer/footer.component';

import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {BackgroundComponent} from './../background/background.component';

import { CustomValidators } from '../../../utils/validators';
import {RequestStatus} from '../../../models/request-status.model';
import {AuthService} from '../../../services/auth.service';
import Swal from 'sweetalert2'
import { error } from 'console';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BtnComponent, ReactiveFormsModule, HeaderComponent, FooterComponent, BackgroundComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private autService =  inject(AuthService);

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  })

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      //this.autService.register(email, password, name).subscribe({
      this.autService.registerAndLogin(email, password, name).subscribe({
        next: () =>{
          Swal.fire({
            title: 'Success',
            text: 'Created',
            icon: 'success',
            confirmButtonText: 'Exit'
          })
          this.router.navigate(['/board'])
        },
        error: (error) =>{
          console.log(error)
          Swal.fire({
            title: 'Error!',
            text: error.statusText,
            icon: 'error',
            confirmButtonText: 'Exit'
          })
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
   if(this.formUser.valid){
    this.statusUser = 'loading';
    const {email} = this.formUser.getRawValue()
    this.autService.isAvailable(email).subscribe({
      next: (rta) =>{
        console.log(1)
        if(rta.isAvailable){
          console.log(2)
          this.showRegister = true;
         this.form.controls.email.setValue(email)
        }else{
          this.router.navigate(['/login'],{
            queryParams: {email}
          })
        }
        
      },
      error: (err) =>{
        console.log(err)
      }
    })
   }else{
    this.formUser.markAllAsTouched()
   }
  }
  }

