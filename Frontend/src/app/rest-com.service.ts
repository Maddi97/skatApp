import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { stringify } from "@angular/compiler/src/util";
import { data_row } from "./env";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
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
      "http://127.0.0.1:5000/postmethod",
      this.serverData,
      httpOptions
    );
  }

  addPlayerOnServer(name): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(name));
    return this.http.post<string>(
      "http://127.0.0.1:5000/addPlayer",
      this.serverData,
      httpOptions
    );
  }
  addGameOnServer(gameData): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(gameData));
    return this.http.post<string>(
      "http://127.0.0.1:5000/addGame",
      this.serverData,
      httpOptions
    );
  }
  addGameDetailsOnServer(gameData): Observable<string> {
    this.serverData = JSON.parse(JSON.stringify(gameData));
    return this.http.post<string>(
      "http://127.0.0.1:5000/addGameDetails",
      this.serverData,
      httpOptions
    );
  }
  getGameDetailsCurrentGame() {
    this.http
      .get("http://127.0.0.1:5000/getGameDetailsCurrentGame")
      .subscribe(data => {
        this.serverData = data as JSON;
        console.log(this.serverData);
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
    return this.http.get("http://127.0.0.1:5000/getHighScoreCurrentGame");
  }

  setGameTable(table: number[]) {
    this.gameTable.next(table);
  }

  setTableData(dataSource: any) {
    this.dataSource.next(dataSource);
  }
  getAllRoundsOfAllPlayerPerGame() {
    return {
      Johann: [22, 55, -321, 11, 43, 420, 34, 100, 0],
      Maddi: [22, -312, -1211, 23, 40, 0, 0, 3, 18, 14],
      Johan: [0, 0, 0, 55, -321, -42, 321, 121, 0, 24, 12]
    };
  }
  getHighestScoresOfAllTime(){
    return {
      Johann: [22, 55, -321, 11, 43, 420, 34, 100, 0],
      Maddi: [22, -312, -1211, 23, 40, 0, 0, 3, 18, 14],
      Johan: [0, 0, 0, 55, -321, -42, 321, 121, 0, 24, 12]
    };
  }
  getBestPlayerScores(){
    return {
      Johann: [22, 55, -321, 11, 43, 420, 34, 100, 0],
      Maddi: [22, -312, -1211, 23, 40, 0, 0, 3, 18, 14],
      Johan: [0, 0, 0, 55, -321, -42, 321, 121, 0, 24, 12]
    };
  }
  getMostPlayedHands(){
    var data ={
      Johann: [22, 55, 31, 11, 43, 20, 34],
      Maddi: [22, 32, 21, 23, 40, 40, 10],
      Johan: [55, 31, 42, 21, 12, 24, 12]
    };
    return data;
  }
}
