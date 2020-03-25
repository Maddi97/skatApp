import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ApiService } from '../api.service';
import { Game, IGame } from 'src/assets/classes/game';
import { GameService } from '../game/game.service';
import { Observable, Subject } from 'rxjs';
import { Player, IPlayer } from 'src/assets/classes/player';
import { takeUntil, switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddPlayerComponent } from '../add-player/add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss']
})
export class NewGameComponent implements OnInit {

  allExistingPlayer: Player[] = [];
  playersOfGame: IPlayer[] = [];

  errorMessage: string;

  constructor(
    private dialog: MatDialog,
    private api: ApiService, 
    private gameService: GameService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.api.getAllPlayer().subscribe({
      next: players => this.allExistingPlayer = players
    })
  }

  //gets player selected in playerList
  startNewGame() {
    if (this.playersOfGame.length >= 3){
      this.gameService.currentGame$.pipe(first()).subscribe(x => console.log(x));
      this.router.navigate(['/game'])
    }
    else {
      console.warn('less then 3 players selected');
      this.errorMessage = 'select at least 3 players';
    }
  }

  updatePlayerList(players) {
    
  }

  addPlayers(){
    const instance = this.dialog.open(AddPlayerComponent);
    const newPlayers = instance.componentInstance;
    instance.afterClosed().subscribe(() => {
      newPlayers.newPlayers.forEach(element => {
        this.allExistingPlayer.push(element);
      })
      this.assignPlayers();
    })
  }

  assignPlayers() {
    const unsubscribe = new Subject<void>()
    // prevent early closing
    const instance = this.dialog.open(PlayerListComponent, {disableClose: true})
    const playerList = instance.componentInstance

    // close when clicked outside
    instance.backdropClick().pipe(takeUntil(unsubscribe)).subscribe(() => {
      instance.close()
    })


    // get list + push
    const newGame = instance.afterClosed().pipe(
      takeUntil(unsubscribe),
      switchMap(() => {
        this.playersOfGame = playerList.players;
        return this.gameService.newGame(playerList.players);
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
