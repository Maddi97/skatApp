import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ApiService } from '../api.service';
import { Game, IGame } from 'src/assets/classes/game';


@Component({
  selector: 'app-game',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss']
})
export class NewGameComponent implements OnInit {

  allExistingPlayer=[];
  playerList=[];

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {
    this.api.getAllPlayer().subscribe(dict => this.allExistingPlayer=dict['allPlayer'])
  }

  ngAfterViewInit() {
    //this.dialog.open(PlayerListComponent)
  }

  //gets player selected in playerList
  startNewGame(){
    const game: IGame = new Game(null, null, 1, this.playerList)
    //console.log(game.getPlayerList())
    this.api.addGame(game).subscribe()
  }
 updatePlayerList(players){
   this.playerList=players
 }
}
