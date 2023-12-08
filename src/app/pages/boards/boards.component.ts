import { Component, signal } from '@angular/core';
import {NavbarComponent} from './../../components/navbar/navbar.component';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import {faTrello} from '@fortawesome/free-brands-svg-icons';
import {CdkAccordionModule} from '@angular/cdk/accordion';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, CdkAccordionModule, CommonModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent {
  faBox = faBox;
  faWaveSquare =faWaveSquare;
  faClock = faClock;
  faTrello = faTrello;
  faAngleUp= faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear

  items = signal( [
  {
    label: 'Item 1',
    items: [
      {
        label: 'sub Item 1.1',
      },
      {
        label: 'sub Item 1.2',
      }
    ]
  },
  {
    label: 'Item 2',
    items: [
      {
        label: 'sub Item 2.1',
      },
      {
        label: 'sub Item 2.2',
      }
    ]
  },
  {
    label: 'Item 3',
    items: [
      {
        label: 'sub Item 3.1',
      },
      {
        label: 'sub Item 3.2',
      },
      {
        label: 'sub Item 3.3',
      }
    ]
  },
  ]);
}
