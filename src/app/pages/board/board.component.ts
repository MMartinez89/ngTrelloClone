import { Component, inject, signal } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NavbarComponent} from '../../components/navbar/navbar.component'
import {ToDo} from '../../models/todo.model'
import { CommonModule } from '@angular/common';
import { Column } from '../../models/colum.model';
import {DialogModule, Dialog} from '@angular/cdk/dialog';
import {TodoDialogComponent} from './../../components/todo-dialog/todo-dialog.component';

//import { title } from 'process';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent, CommonModule,DialogModule, TodoDialogComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  columns: Column[] = [
    {
      title: 'todo',
      todos: [
        {
          id: '1',
          title: 'task 1'
        },
        {
          id: '2',
          title: 'task 2'
        },
        {
          id: '3',
          title: 'task 3'
        },
      ]
    },
    {
      title: 'Doing',
      todos: [{
        id: '3',
        title: 'Comprar Ropa'
      }]
    },
    {
      title: 'Done',
      todos: [
        {
          id: '4',
          title: 'estudiar angular'
        }
      ]
    }
    
  ];

  todos = signal<ToDo[]> ([]);

  doing = signal<ToDo[]>([]);

  done = signal<ToDo[]>([]);

  private dialog = inject(Dialog);

  constructor(){

  }



  drop(event: CdkDragDrop<ToDo[]>){

    //Pregunta si el drop esta en el mismo container
    if(event.previousContainer === event.container){
      //Mueve las lista del mismo container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      //mueve la informacion de diferente container
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addColumn(){
    this.columns.push( {
      title: 'new',
      todos: [
        {
          id: '1',
          title: '2'
        }
      ]
    });
  }

  openDialog(todo: ToDo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      data:{
        todo: todo,
      }
    });
    dialogRef.closed.subscribe(output =>{
      console.log(output);
    } );
  }
}
