import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, MonoTypeOperatorFunction } from 'rxjs';
import { IPlayer, Player } from 'src/assets/classes/player';
import { map, catchError, tap } from 'rxjs/operators';
import { Game, IGame } from 'src/assets/classes/game';
import { Round, IRound } from 'src/assets/classes/round';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = "http://127.0.0.1:5000";

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
      map(playerJSON => playerJSON as Player)
    )
  }

  addPlayer(player: IPlayer): Observable<Player> {
    return this.http.post<IPlayer>(
      `${this.URL}/player`,
      player
    ).pipe(
      errorProcedure(),
      map(playerJSON => playerJSON as Player)
    )
  }

  getAllPlayer(): Observable<Player[]> {
    return this.http.get<IPlayer[]>(
      `${this.URL}/getAllPlayer`
            ).pipe(
      errorProcedure(),
      tap(x => console.log(x)),
      map(playerJSON => playerJSON as Player[])
    )
  }

  getGame(game: IGame): Observable<Game> {
    const params = this._getQueryParams(game)

    return this.http.get<IGame>(
      `${this.URL}/game`,
      { params: params }
    )
      .pipe(
        errorProcedure(),
        map(gameJSON => gameJSON as Game)
      )
  }

  getLatestGame(): Observable<Game>{
    return this.http.get<IGame>(
      `${this.URL}/latestGame`
    ).pipe(
      errorProcedure(),
      map(gameJSON => gameJSON as Game)
    )
  }

  addGame(game: IGame): Observable<Game> {
    return this.http.post<IGame>(
      `${this.URL}/game`,
      game
    ).pipe(
      errorProcedure(),
      map(gameJSON => gameJSON as Game)
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
        map(roundJSON => roundJSON as Round)
      )
  }

  addRound(round: IRound): Observable<Round> {
    return this.http.post<IRound>(
      `${this.URL}/gameDetails`,
      round
    ).pipe(
      errorProcedure(),
      map(roundJSON => roundJSON as Round)
    )
  }

  private _getQueryParams(object: any): HttpParams {
    let params = new HttpParams()
    Object.keys(object).forEach(key => {
      params = params.set(key, object[key])
    })

    return params
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