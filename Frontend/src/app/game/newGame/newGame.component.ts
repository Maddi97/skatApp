import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../../player-list/player-list.component';
import { ApiService } from '../../api.service';
import { Game, IGame } from 'src/assets/classes/game';
import { GameService } from '../game.service';
import { Observable, Subject } from 'rxjs';
import { Player, IPlayer } from 'src/assets/classes/player';
import { takeUntil, switchMap, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddPlayerComponent } from '../../add-player/add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.scss']
})
export class NewGameComponent implements OnInit {

  allExistingPlayer: Player[] = [];
  participants: Player[] = []

  errorMessage: string;

  constructor(
    private dialog: MatDialog,
    private gameService: GameService,
    private router: Router,
    private api: ApiService
    ) { }

  ngOnInit() {
    this.api.getAllPlayer().subscribe({
      next: players => this.allExistingPlayer = players
    })
  }

  addPlayers(){
    const instance = this.dialog.open(AddPlayerComponent);
    const newPlayers = instance.componentInstance;
    
    newPlayers.newPlayer
    .pipe(
      takeUntil(instance.afterClosed()),
      switchMap(player => this.api.addPlayer(player))
    ).subscribe({
      next: player => {
        console.log("added player", player)
        this.allExistingPlayer.unshift(player)
      }
    })
  }

  assignPlayers() {
    const unsubscribe = new Subject<void>()
    // prevent early closing
    const instance = this.dialog.open(PlayerListComponent, {disableClose: true})
    const playerList = instance.componentInstance
    playerList.allPlayers = this.allExistingPlayer
    
    // close when clicked outside
    instance.backdropClick().pipe(takeUntil(unsubscribe)).subscribe(() => {
      instance.close()
    })

    // get list + push
    const participants$ = instance.afterClosed().pipe(
      takeUntil(unsubscribe),
      map(() => playerList.players)
    )
    
    participants$.subscribe({
      next: players => {
        this.participants = players
        unsubscribe.next()
        unsubscribe.complete()
      }
    })
  }


  startNewGame() {
    if (this.participants.length < 3){
      console.warn('less then 3 players selected');
      return       
    }

    this.gameService.newGame(this.participants)
    this.router.navigate(['/game'])
  }
}
