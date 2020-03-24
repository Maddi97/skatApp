import { Injectable } from '@angular/core';
import { Player, IPlayer } from 'src/assets/classes/player';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ApiService } from '../api.service';
import { Game, IGame } from 'src/assets/classes/game';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame$: Observable<Game> = null

    constructor(private api: ApiService) { }

    newGame(players: IPlayer[]): Observable<Game> {
        const game: IGame = {
            date: new Date(),
            players: players,
        }
        this.currentGame$ =  this.api.addGame(game)
        return this.currentGame$
    }

    getGameByID(id: number): Observable<Game> {
        this.currentGame$ = this.api.getGame({gameID: id})
        return this.currentGame$
    }



}
