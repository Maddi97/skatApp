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
  
  currentGame: IGame;
  currentPlayers: IPlayer[];
  currentRounds: IRound[];

  constructor( private api: ApiService) { 
  }
      
  ngOnInit() {
    const a= this.api.getGame({gameID: 1})
    a.subscribe(x => console.log(x))
    const b= a.pipe(
      switchMap(x => this.api.getPlayer({name: "Maddi"}))
    )
    b.subscribe(x => console.log(x))
    b.pipe(
      switchMap(x => this.api.getRound({gameID: 1, playerID: 1}))
    ).subscribe(x => console.log(x))
  //  this.api.getPlayer({name:"maddi"}).subscribe(x => console.log(x))
  }

}
