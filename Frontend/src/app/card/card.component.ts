
import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('rotate', [
      state('rotate', style({transform: 'rotateY(180deg)', background: 'white' })),
      state('rotateBack', style({transform: 'rotateY(-180deg)', background: 'white' })),
      
      
      transition('* => *', animate(400)),
      transition('* => *', style({ opacity: 0})),
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() option: string;
  @Input() source: string;

  ani: string;
  anima: string;

  constructor() { }

  ngOnInit() {
  }

  setAni(){
    this.ani = 'rotate';
    this.anima = 'opa'
  }

  mouseOver(){
    if(this.ani == 'rotate'){
      this.ani = '';
    }
    else {
      this.ani = 'rotate';
    }
  }
}
