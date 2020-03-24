import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { switchMap } from 'rxjs/operators';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  currentGame: IGame = new Game();
  currentRounds: IRound[] = [];
  allPlayers: IPlayer[] = []


  constructor( private api: ApiService) { 
  }
      
  ngOnInit() {
      this.api.getAllPlayer().subscribe({
        next: players => {
          console.log(players)
          this.allPlayers = players}
      })
  }

  get players(): IPlayer[] {
    return this.currentGame.players
  }

  set players(players: IPlayer[]) {
    this.currentGame.players = players
  }

}
