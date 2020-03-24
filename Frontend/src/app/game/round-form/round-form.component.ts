import { Component, OnInit, Input } from '@angular/core';
import { IPlayer, Player } from 'src/assets/classes/player';
import { IRound, Color, Unter } from 'src/assets/classes/round';
import {
  SPECS,
  COLUMNS,
  FARBE,
  UNTER,
INITIAL_ROUND
} from "src/assets/classes/round";

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.css']
})
export class RoundFormComponent implements OnInit {
  @Input() players: IPlayer[];

  currentRound: IRound = INITIAL_ROUND;

  // constant definitions
  specs = SPECS;
  columns = COLUMNS;
  farbe = FARBE;
  unter = UNTER;

  constructor() { }

  ngOnInit() {
    console.log()
  }
  game_select(key, event){
    console.log(event)
    console.log(this.currentRound)
  }

}
