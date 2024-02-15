import { Component, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router' 
import { FormBuilder, Validators } from '@angular/forms';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {BtnComponent} from '../../btn/btn.component';
import {CustomValidators} from './../../../utils/validators';
import {AuthService} from './../../../services/auth.service'
import {RequestStatus} from './../../../models/request-status.model'

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, BtnComponent],
  templateUrl: './recovery-form.component.html',
  styleUrl: './recovery-form.component.scss'
})
export class RecoveryFormComponent {

  private authService = inject(AuthService);
  private param = inject(ActivatedRoute); //Captura los parametros que llega desde la ruta
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  token: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.param.queryParamMap.subscribe(params =>{
      const token = params.get('token')
      if(token){
        this.token = token;
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  recovery() {
    if (this.form.valid) {
      const {newPassword} = this.form.getRawValue()
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () =>{
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: (err:any) =>{
          this.status = 'failed';
          console.log(err)
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
