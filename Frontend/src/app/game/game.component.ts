import { Component, OnInit } from '@angular/core';
import { NumberFormatStyle } from '@angular/common';

export interface Number {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  num_player: number;
  temp_arr: number[];

  names: string[] = Array();
  nums: Number[] = [
    {value: 3, viewValue: '3 Spieler'},
    {value: 4, viewValue: '4 Spieler'},
    {value: 5, viewValue: '5 Spieler'}
  ];
  constructor() { }

  ngOnInit() {
  }
  onSelect(num: number) {
    this.num_player=num;
    this.temp_arr=Array(num)
    this.names=Array(num)
    for(let i = 0; i<num; i ++)  {
      this.temp_arr[i]=i+1;
    }
  }

  onUsernameInput(name:string){
  
    this.names.push(name)
  }

  removeUser(){
    this.names.pop()
  }

}
