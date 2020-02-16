import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { stringify } from "@angular/compiler/src/util";

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
      return this.http.get("http://127.0.0.1:5000/getGameDetailsCurrentGame");
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
}
