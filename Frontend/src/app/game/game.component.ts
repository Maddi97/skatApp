import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  currentGame: IGame;
  currentPlayers: IPlayer[];
  currentRounds: IRound[];

  constructor( private api: ApiService) { 
  }
      
  ngOnInit() {
    //for new game -> load newest game
    this.api.getLatestGame().subscribe(game => console.log(game))
    //this.currentPlayers = this.currentGame.getPlayerList()
    //console.log(this.currentGame)
    //console.log(this.currentPlayers)
  }

}
