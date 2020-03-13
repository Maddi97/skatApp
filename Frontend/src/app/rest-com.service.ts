import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable, throwError, BehaviorSubject, of } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
import { stringify } from "@angular/compiler/src/util";
import { data_row } from "./env";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
  })
};

@Injectable({
  providedIn: "root"
})
export class RestComService {
  private URL = "http://127.0.0.1:5000/";
  private serverData: JSON;

  private ELEMENT_DATA = new BehaviorSubject<data_row>(null);
  currentGameDetails = this.ELEMENT_DATA.asObservable();

  private gameTable = new BehaviorSubject<number[]>([]);
  currentGameTable = this.gameTable.asObservable();

  private dataSource = new BehaviorSubject<any>(null);
  currentDataSource = this.dataSource.asObservable();

  constructor(private http: HttpClient) {}

  getServerHello() {
    this.http.get(this.URL).subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    });
  }

  sendServerDataRow(DATA_ROW): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(DATA_ROW));
    return this.http.post<string>(
      `${this.URL}postmethod`,
      this.serverData,
      httpOptions
    );
  }

  getPlayerID(playerName){
    this.serverData = JSON.parse(JSON.stringify(playerName));
    return this.http.post<string>(
      `${this.URL}getPlayerID`,
      this.serverData,
      httpOptions
    );
  }

  addPlayerOnServer(name): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(name));
    return this.http.post<string>(
      `${this.URL}addPlayer`,
      this.serverData,
      httpOptions
    );
  }
  addGameOnServer(gameData): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(gameData));

    return this.http.post<string>(
      `${this.URL}addGame`,
      this.serverData,
      httpOptions
    )
  }

  addGameDetailsOnServer(gameData): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(gameData));
    return this.http.post<string>(
      `${this.URL}addGameDetails`,
      this.serverData,
      httpOptions
    );
  }
  getGameDetailsCurrentGame() {
    this.http
      .get(`${this.URL}getGameDetailsCurrentGame`)
      .subscribe(data => {
        this.serverData = data as JSON;
      });
  }
  // async getGameDetailsCurrentGame() {
  //   this.http
  //     .get("http://127.0.0.1:5000/getGameDetailsCurrentGame")
  //     .toPromise()
  //     .then(data => {
  //       this.serverData = data as JSON;
  //       console.log(this.serverData);
  //     });
  // }

  getHighScoreCurrentGame() {
    return this.http.get(`${this.URL}getHighScoreCurrentGame`);
  }

  getPlayerCurrentGame() {
    this.http
      .get(`${this.URL}getPlayerOfCurrentGame`)
      .subscribe(data => {
        this.serverData = data as JSON;
        console.log(data);
      });
  }

  setGameTable(table: number[]) {
    this.gameTable.next(table);
  }

  setTableData(dataSource: any) {
    this.dataSource.next(dataSource);
  }

  getAllRoundsOfAllPlayerPerGame() {
    this.http
      .get(`${this.URL}getGameDetailsCurrentGame`)
      .pipe(catchError(() =>  of({})))
      .subscribe(x => console.log(x))
    return dummyData
  }

  getLatestGameId() {
    return this.http.get(
      `${this.URL}latestGameID`
    ).pipe(
      catchError(() => of({})),
    )
  }

  addGameParticipants(gameID: string, players: number[]) {
    var params = new HttpParams()
    params = params.append("gameID", gameID)
    return this.http.post(`${this.URL}addGameParticipants`,players)
  }

  getHighestScoresOfAllTime() {
    return dummyData
  }
  getBestPlayerScores() {
    return dummyData
  }
  getMostPlayedHands() {
    var data = {
      Johann: [22, 55, 31, 11, 43, 20, 34],
      Maddi: [22, 32, 21, 23, 40, 40, 10],
      Johan: [55, 31, 42, 21, 12, 24, 12]
    };
    return data;
  }
}


const dummyData = {
  Johann: [22, 55, -321, 11, 43, 420, 34, 100, 0],
  Maddi: [22, -312, -1211, 23, 40, 0, 0, 3, 18, 14],
  Johan: [0, 0, 0, 55, -321, -42, 321, 121, 0, 24, 12]
};