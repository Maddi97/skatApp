import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  option: string[] = ['Highscore', 'Neues Spiel', 'Pics of cows'];

  constructor() { }

  ngOnInit() {
  }

}
