import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { switchMap, first } from 'rxjs/operators';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';
import { GameService } from '../game/game.service';
import { TableComponent } from '../game-old/table/table.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  currentGame: IGame = new Game();
  currentRounds: IRound[] = [];
  allPlayers: IPlayer[] = []


  constructor( 
    private api: ApiService, 
    private gameService: GameService
    ){ 
  }
      
  ngOnInit() {

    this.gameService.currentGame$.pipe(first()).subscribe(game => this.currentGame=game)
    this.allPlayers=this.currentGame.players
    console.log(this.allPlayers)
    console.log(this.currentGame)

  }

  get players(): IPlayer[] {
    return this.currentGame.players
  }

  set players(players: IPlayer[]) {
    this.currentGame.players = players
  }

}
