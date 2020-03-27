import { Injectable } from '@angular/core';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ApiService } from '../api.service';
import { Game, IGame } from 'src/assets/classes/game';
import { shareReplay, tap } from 'rxjs/operators';
import { IRound, Round } from 'src/assets/classes/round';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    count = 0
    private _currentGame$: BehaviorSubject<Game> = new BehaviorSubject(undefined)
    get currentGame$(): Observable<Game> {
        return this._currentGame$.asObservable().pipe(shareReplay())
    }

    private _lastRoundNum = 0

    constructor(private api: ApiService) { }

    newGame(players: IPlayer[]): Observable<Game> {
        const game: IGame = {
            date: new Date(),
            players: players,
        }

        this.api.addGame(game).subscribe({
            next: game => {
                this._currentGame$.next(game)
                this._lastRoundNum = 0
            },
            error: error => console.log(error)
        })
        return this.currentGame$
    }

    // getGameByID(id: number): Observable<Game> {
    //     this.currentGame$ = this.api.getGame({gameID: id})
    //     return this.currentGame$
    // }

    addRound(round: IRound): Observable<Round> {
        round.gameRound = this._lastRoundNum + 1
        round.gameID = this._currentGame$.getValue().gameID
        const round$ = this.api.addRound(round).pipe(
            tap(round => {
                this.addRoundToGame(round)
            }),
            shareReplay()
        )
        return round$
    }

    private addRoundToGame(round: Round) {
        const game = this._currentGame$.getValue()
        game.rounds.unshift(round)
        this._currentGame$.next(game)
    }


}
