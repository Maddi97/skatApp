import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ApiService } from '../api.service';
import { Game, IGame } from 'src/assets/classes/game';
import { GameService } from '../game/game.service';
import { Observable, Subject } from 'rxjs';
import { Player } from 'src/assets/classes/player';
import { takeUntil, switchMap, first } from 'rxjs/operators';


@Component({
  selector: 'app-game',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss']
})
export class NewGameComponent implements OnInit {

  allExistingPlayer: Player[] = [];

  constructor(private dialog: MatDialog, private api: ApiService, private gameService: GameService) { }

  ngOnInit() {
    this.api.getAllPlayer().subscribe({
      next: players => this.allExistingPlayer = players
    })
  }

  //gets player selected in playerList
  startNewGame() {
    this.gameService.currentGame$.pipe(first()).subscribe(x => console.log(x))
  }

  updatePlayerList(players) {
    
  }

  assignPlayers() {
    const unsubscribe = new Subject<void>()
    // prevent early closing
    const instance = this.dialog.open(PlayerListComponent, {disableClose: true})
    const playerList = instance.componentInstance

    // close only if  atleast 3 players selected
    instance.backdropClick().pipe(takeUntil(unsubscribe)).subscribe(() => {
      if (playerList.players.length < 3) {
        return;
      }
      instance.close()
    })
    // get list + push
    const newGame = instance.afterClosed().pipe(
      takeUntil(unsubscribe),
      switchMap(() => {
        return this.gameService.newGame(playerList.players)
      })
    ) 

    playerList.allPlayers = this.allExistingPlayer
    
    newGame.subscribe(game => {

      console.log(game)
      unsubscribe.next()
      unsubscribe.complete()
    })


  }
}
