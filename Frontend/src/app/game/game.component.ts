import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { switchMap, first } from 'rxjs/operators';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';
import { GameService } from '../game/game.service';
import { log } from 'util';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  currentGame: IGame = new Game();
  currentRounds: IRound[] = [];
  allPlayers: IPlayer[] = []


  testRound= [{
    GameID: 1,
    gameRound: 1,
    Johann: 420,
    Maddi: 0,
    Johan: 0,
  },
  {
    GameID: 1,
    gameRound: 2,
    Johann: 0,
    Maddi: 0,
    Johan: 18,
  },
  {
    GameID: 1,
    gameRound: 3,
    Johann: 0,
    Maddi: 68,
    Johan: 0,
  }];

  constructor( 
    private api: ApiService, 
    private gameService: GameService
    ){ 
  }
      
  ngOnInit() {

    this.gameService.currentGame$.pipe(first()).subscribe(game => {this.currentGame=game;this.allPlayers=this.currentGame.players
    })
    console.log(this.allPlayers)
    console.log(this.currentGame)
    console.log(this.testRound);
    //this.addRound()

  }

  get players(): IPlayer[] {
    return this.currentGame.players
  }

  set players(players: IPlayer[]) {
    this.currentGame.players = players
  }

  
  addRound(roundFinished){

    roundFinished.score=999;
    roundFinished.scoreSum=999;
    var testRound:IRound = {
      "gameID":this.currentGame.gameID,
      "playerID":4, 
      "gameRound":1,
      "score": 99999,
      "scoreSum": 999999,
      "color":"Grün",
      "unter":"Mit 2", 
      "hand":true,
      "schneider":false,
      "schwarz":true,
      "schneiderAngesagt": true,
      "schwarzAngesagt":false,
      "ouvert":false,
      "bock":true
  }
    this.api.addRound(roundFinished).subscribe(round => this.currentRounds.push(round))
    console.log(this.currentRounds)
  }
  
}
