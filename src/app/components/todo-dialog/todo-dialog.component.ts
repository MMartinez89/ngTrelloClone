import { Component, Inject, inject } from '@angular/core';
import {DialogModule, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {BtnComponent} from '../btn/btn.component'
import {faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock} from '@fortawesome/free-solid-svg-icons';
import { InputData } from '../../models/data.model';
import { ToDo } from '../../models/todo.model';
import { OutData } from '../../models/outputData.model';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [FontAwesomeModule, BtnComponent],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.scss'
})
export class TodoDialogComponent {

  todo: ToDo;

  private dialogRef = inject(DialogRef<OutData>);
  private data = inject(DIALOG_DATA);

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  constructor(){
    this.todo =  this.data.todo;
  }

  close(){
    this.dialogRef.close({
      rta: true
    });
  }

  CloseWhithRta(rta: boolean){
    this.dialogRef.close({rta});
  }

}
