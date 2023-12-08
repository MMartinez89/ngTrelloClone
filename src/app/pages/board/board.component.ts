import { Component, signal } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NavbarComponent} from '../../components/navbar/navbar.component'
import {ToDo} from '../../models/todo.model'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent, CommonModule,],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  todos = signal<ToDo[]> ([
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
  ]);

  doing = signal<ToDo[]>([
    {
      id: '3',
      title: 'Comprar Ropa'
    }
  ]);

  done = signal<ToDo[]>([
    {
      id: '4',
      title: 'estudiar angular'
    },
  ]);



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

}
