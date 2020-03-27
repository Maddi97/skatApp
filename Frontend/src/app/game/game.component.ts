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
      map(game => game.rounds.sort(
        function(a,b){
        return a.gameRound - b.gameRound   //invert array to get table in right order
        }
      )),
    )
  }
  
  addRound(roundFinished){

    roundFinished.score=this.calculateScore(roundFinished);

    this.gameService.addRound(roundFinished).pipe(first()).subscribe({
      next: round => console.log("added new round", round)
    })
  }

  calculateScore(round:Round) :number{
    console.log(round)
    var score:number = 0;
    var color: number = 0;
    var multiplier = 1;  //spiel 1


      if(round.color == "Ramsch") {
        if(round.score < 0 ) return Number(round.score)
        else return round.score*-1
      }
    
      if(round.color === "Schell") {
        color = 9; 
      }
      if(round.color === "Rot")    {
        color = 10;
      }
      if(round.color === "Grün")   {
        color = 11;
      }
      if(round.color === "Eichel") {
        color = 12
      }
      if(round.color === "Grand")  {
        color = 24
      }
      if(round.color === "Null")   {
        color = 23
      } 
    
    

    
      if (round.unter.split(" ").pop() === "1")  {
        multiplier+=1;
      } 
      if (round.unter.split(" ").pop() === "2")  {
        multiplier+=2;
      }
      if (round.unter.split(" ").pop() === "3")  {
        multiplier+=3;
      }
      if (round.unter.split(" ").pop() === "4")  {
        multiplier+=4;
      }
     
        
    

    if(round.hand) {
      multiplier+=1
    }
    if(round.schneider) {
      multiplier+=1
    }
    if(round.schneiderAngesagt) {
      multiplier+=1
    }
    if(round.schwarz) {
      multiplier+=1
    }
    if(round.schwarzAngesagt) {
      multiplier+=1
    }
    if(round.ouvert) {
      multiplier+=1
    }
    if(round.bock) {
      multiplier*=2
    }
    if(round.loss){
      multiplier*=-2
    }

    score = color*multiplier

    return score
  }
  
}
