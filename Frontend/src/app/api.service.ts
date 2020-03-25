import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, MonoTypeOperatorFunction, BehaviorSubject } from 'rxjs';
import { IPlayer, Player } from 'src/assets/classes/player';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = "http://127.0.0.1:5000";

  private _storedGames$ = new BehaviorSubject<Map<number, Observable<Game>>>(new Map())

  constructor(private http: HttpClient) { }

  testDB(): Observable<any> {
    return this.http.get(this.URL)
  }

  getPlayer(player: IPlayer): Observable<Player> {
    const params = this._getQueryParams(player)

    return this.http.get<IPlayer>(
      `${this.URL}/player`,
      { params: params }
    ).pipe(
      errorProcedure(),
      map(playerJSON => Player.fromJSON(playerJSON))
    )
  }

  addPlayer(player: IPlayer): Observable<Player> {
    return this.http.post<IPlayer>(
      `${this.URL}/player`,
      player
    ).pipe(
      errorProcedure(),
      map(playerJSON => Player.fromJSON(playerJSON))
    )
  }

  getAllPlayer(): Observable<Player[]> {
    return this.http.get<IPlayer[]>(
      `${this.URL}/getAllPlayer`
            ).pipe(
      errorProcedure(),
      map(playerJSON => playerJSON.map(player => Player.fromJSON(player)))
    )
  }

  getGame(game: number): Observable<Game> 
  getGame(game: IGame): Observable<Game>
  getGame(game: IGame | number): Observable<Game> {
    let gameID: number
    if (typeof game ==  "number") {
      gameID = game
      game = {gameID: game}
    } else {
      gameID = game.gameID
    }

    if (this._storedGames$.getValue().has(gameID)) {
      return this._getStoredGame(gameID)
    } else {
      const params = this._getQueryParams(game)
      return this.http.get<IGame>(
        `${this.URL}/game`,
        { params: params }
      ).pipe(
          errorProcedure(),
          map(gameJSON => Game.fromJSON(gameJSON)),
          tap(game => this._storeGame(game)),
          switchMap(() => this._getStoredGame(gameID))
        )
    }

    

    
  }

  getLatestGame(): Observable<Game>{
    return this.http.get<IGame>(
      `${this.URL}/latestGame`
    ).pipe(
      errorProcedure(),
      map(gameJSON => Game.fromJSON(gameJSON))
    )
  }

  addGame(game: IGame): Observable<Game> {
    return this.http.post<IGame>(
      `${this.URL}/game`,
      game
    ).pipe(
      errorProcedure(),
      map(gameJSON => Game.fromJSON(gameJSON)),
      tap(game => {
        const currentGames = this._storedGames$.getValue()
        currentGames.set(game.gameID, of(game))
        this._storedGames$.next(currentGames)
      }),
      shareReplay()
    )
  }

  getRound(round: IRound): Observable<Round> {
    const params = this._getQueryParams(round)

    return this.http
      .get<IRound>(
        `${this.URL}/gameDetails`,
        { params: params }
      )
      .pipe(
        errorProcedure(),
        map(roundJSON => Round.fromJSON(roundJSON))
      )
  }

  addRound(round: IRound): Observable<Round> {
    return this.http.post<IRound>(
      `${this.URL}/gameDetails`,
      round
    ).pipe(
      errorProcedure(),
      map(roundJSON => Round.fromJSON(roundJSON))
    )
  }

  invalidateGames() {
    this._storedGames$.next(new Map())
  }

  private _getQueryParams(object: any): HttpParams {
    let params = new HttpParams()
    Object.keys(object).forEach(key => {
      params = params.set(key, object[key])
    })

    return params
  }

  private _storeGame(game: Game) {
    const games = this._storedGames$.getValue()
    games.set(game.gameID, of(game))
    this._storedGames$.next(games)
  }

  private _getStoredGame(gameID: number): Observable<Game> {
    return this._storedGames$.pipe(
      switchMap(games => games.get(gameID))
    )
  }


}

const errorProcedure = (fallback = undefined): MonoTypeOperatorFunction<any> => {
  return source$ => source$.pipe(
    catchError(err => {
      console.log(err)
      return of(fallback)
    })
  )
}