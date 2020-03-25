import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { switchMap, first, shareReplay, catchError, filter, map, tap, takeUntil } from 'rxjs/operators';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';
import { GameService } from '../game/game.service';
import { log } from 'util';
import { Observable, of, NEVER, Subject } from 'rxjs';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  
  currentGame$: Observable<Game> = NEVER

  private _unsubscribe = new Subject<void>()

  constructor( 
    private gameService: GameService
    ){ }
      
  ngOnInit() {
    this.currentGame$ = this.gameService.currentGame$.pipe(
      takeUntil(this._unsubscribe),
      catchError(() => of(undefined)),
      filter(game => game != undefined && game instanceof Game),
      tap(x => console.log(x)),
      shareReplay(),
    )
    //this.addRound()

  }

  ngOnDestroy() {
    this._unsubscribe.next()
    this._unsubscribe.complete()
  }

  get players$(): Observable<IPlayer[]> {
    return this.currentGame$.pipe(
      map(game => game.players)
    )
  }

  get rounds$(): Observable<IRound[]> {
    return this.currentGame$.pipe(
      map(game => game.rounds),
    )
  }
  
  addRound(roundFinished){

    roundFinished.score=999;
    roundFinished.scoreSum=999;
    var testRound:IRound = {
      "playerID":4, 
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
    this.gameService.addRound(roundFinished).pipe(first()).subscribe({
      next: round => console.log("added new round", round)
    })
  }
  
}
