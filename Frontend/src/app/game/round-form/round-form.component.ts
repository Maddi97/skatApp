import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPlayer, Player } from 'src/assets/classes/player';
import { IRound, Color, Unter, Round } from 'src/assets/classes/round';

import {
  SPECS,
  FARBE,
  UNTER,
  EMPTY_ROUND
} from "src/assets/classes/round";
import { IGame, Game } from 'src/assets/classes/game';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-round-form',
  templateUrl: './round-form.component.html',
  styleUrls: ['./round-form.component.css']
})
export class RoundFormComponent implements OnInit {
  @Input() players: IPlayer[];
  @Input() set game(game: Game) {
    this.currentRound.gameID = game.gameID ? game.gameID : -1
}

  @Output() roundFinished = new EventEmitter<IRound>(); 

  currentRound: IRound = {...EMPTY_ROUND};
  
  //watches selected specs
  selected_specs:string[]=[]
  specs_control = new FormControl()
  // constant definitions
  specs = SPECS;
  columns = ['Unter', 'Farbe', 'Specs', 'Bock', 'Gespielt'];
  farbe = FARBE;
  unter = UNTER;

  constructor() { }

  ngOnInit() {
  }

  observeSelectedSpecs(selected_specs){
    this.selected_specs=selected_specs
  }


  formSubmit(){

    this.currentRound = this.setSelctedSpecsToCurrentRound(this.currentRound)
    this.specs_control.reset()

    console.log(this.currentRound)
    
    this.roundFinished.next(this.currentRound)

    this.currentRound = {...EMPTY_ROUND, gameID: this.currentRound.gameID};


  }

  setSelctedSpecsToCurrentRound(currentRound){
    this.selected_specs.forEach(function (spec){
      currentRound[spec] = !currentRound[spec]  //switches boolean
    })
    this.selected_specs= []
    return currentRound;
  }


}
