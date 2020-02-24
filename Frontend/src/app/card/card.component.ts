
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('rotate', [
      state('bigger', style({
        width: '505px',
        height: '600px',
        margin: 'auto',
      })),
      state('color', style({
        background: 'linear-gradient(rgb(255, 78, 108), #84aed6)'
      })),
      
      transition('* => *', animate(200)),
      transition('* => *', style({ opacity: 0})),
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() option: string;
  @Input() source: string;

  ani: string;

  constructor() { }

  //changes background color when mouse enters card
  @HostListener('mouseenter')
  onMouseEnter(){
    this.ani = 'color';
  }
  //changes backgroundcolor back
  @HostListener('mouseleave')
  onMouseLeave(){
    this.ani = '';
  }
  
  ngOnInit() {
  }
}
