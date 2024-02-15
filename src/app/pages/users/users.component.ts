import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import {DataSourceUser} from './data-source'
import { CdkTableModule } from '@angular/cdk/table';
import {NavbarComponent} from './../../components/navbar/navbar.component'
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, CdkTableModule, NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  private userService =  inject(UsersService);
  private authService = inject(AuthService);
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null =  null;
  
  constructor(){
    
  }

  ngOnInit(): void {
    this.getUser();
    this.authService.user$.subscribe(user =>{
      this.user = user
    });
   // this.userService.getUsers().subscribe((users) =>{
   //   this.dataSource.init(users);
   // });
  }
  
  getUser(){
    this.userService.getUsers().subscribe((users) =>{
      this.dataSource.init(users);
    });
  }
}


