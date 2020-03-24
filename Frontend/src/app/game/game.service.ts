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

    storedGames = new BehaviorSubject<Map<number, Observable<Game>>>(new Map())

    constructor(private api: ApiService) { }

    newGame(players: IPlayer[]): Observable<Game> {
        const game: IGame = {
            date: new Date(),
            players: players,
        }
   
        return this.api.addGame(game).pipe(
            tap(game => {
                const currentGames = this.storedGames.getValue()
                currentGames.set(game.gameID, of(game))
            }),
            shareReplay()
        )
    }

    invalidateGames() {
        this.storedGames.next(new Map())
    }

}
