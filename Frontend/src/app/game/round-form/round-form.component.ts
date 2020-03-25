import { Component, OnInit, Input } from '@angular/core';
import { IPlayer, Player } from 'src/assets/classes/player';
import { IRound, Color, Unter, Round } from 'src/assets/classes/round';

import {
  SPECS,
  COLUMNS,
  FARBE,
  UNTER,
EMPTY_ROUND
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
  currentRound: IRound = EMPTY_ROUND;
  
  //watches selected specs
  selected_specs:string[]=[]
  specs_control = new FormControl()
  // constant definitions
  specs = SPECS;
  columns = COLUMNS;
  farbe = FARBE;
  unter = UNTER;

  constructor() { }

  ngOnInit() {
    this.currentRound.gameID=this.game.gameID;
  }

  observeSelectedSpecs(selected_specs){
    this.selected_specs=selected_specs
  }


  formSubmit(){

    this.currentRound = this.setSelctedSpecsToCurrentRound(this.currentRound)
    this.specs_control.reset()

    console.log(this.currentRound)

    //this.resetCurrentRound()

  }

  setSelctedSpecsToCurrentRound(currentRound){
    this.selected_specs.forEach(function (spec){
      currentRound[spec] = !currentRound[spec]  //switches boolean
    })
    this.selected_specs= []
    return currentRound;
  }

  resetCurrentRound(){
    
    this.currentRound.gameRound=null
    this.currentRound.playerID=null
    this.currentRound.score=null
    this.currentRound.scoreSum=null
    this.currentRound.unter=null
    this.currentRound.color=null
    this.currentRound.hand=false
    this.currentRound.schneider=false
    this.currentRound.schneiderAngesagt=false
    this.currentRound.schwarz=false
    this.currentRound.schwarzAngesagt=false
    this.currentRound.ouvert=false
    this.currentRound.bock=false

  }

}
