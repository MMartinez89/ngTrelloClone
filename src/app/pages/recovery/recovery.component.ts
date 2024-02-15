import { Component } from '@angular/core';
import {RecoveryFormComponent} from './../../components/auth/recovery-form/recovery-form.component';
import {BackgroundComponent} from './../../components/auth/background/background.component';
import {HeaderComponent} from './../../components/auth/header/header.component'
import {FooterComponent} from '../../components/auth/footer/footer.component'
import {RouterLinkWithHref} from '@angular/router'

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [RecoveryFormComponent, BackgroundComponent, HeaderComponent, FooterComponent, RouterLinkWithHref],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {

}
