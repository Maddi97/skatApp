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
import { IGame } from 'src/assets/classes/game';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.css']
})
export class RoundFormComponent implements OnInit {
  @Input() players: IPlayer[];
  @Input() game: IGame;
  currentRound: IRound = INITIAL_ROUND;

  test = new FormControl();

  // constant definitions
  specs = SPECS;
  columns = COLUMNS;
  farbe = FARBE;
  unter = UNTER;

  constructor() { }

  ngOnInit() {
    this.currentRound.gameID=this.game.gameID;
  }
  form_submit(){
    console.log(this.game)
    console.log(this.currentRound)
  }

}
