import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { RestComService } from "../rest-com.service.old";
import { GradientButtonComponent } from "../gradient-button/gradient-button.component";
import { switchMap } from "rxjs/operators";

//constants import

import { forkJoin } from 'rxjs';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  // // constant definitions
  // specs = SPECS;
  // columns = COLUMNS;
  // farbe = FARBE;
  // unter = UNTER;

  // mobile: boolean;

  // chartOption: string[] = ["HighscoreCurrentGame", "MostPlayedHands"];

  // displayedColumns: string[];

  // //holds all names of added players!!
  // names: string[] = Array();
  // player_ids: any =Array();

  // gameDetails: any;
  // data: any;
  // highscore: number = 0;
  // gameTable: number[] = [];
  // errorMessage: string = "";

  // DATA_ROW: data_row = INITIAL_DATA_ROW;
  // DATA_ROW_temp: data_row = INITIAL_DATA_ROW;

  // ELEMENT_DATA: data_row[] = [];

  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  // submit: boolean = false;

  // constructor(private restCom: RestComService) {}

  ngOnInit() {}
  //   if (window.screen.width <= 600) {
  //     this.mobile = true;
  //   }
  // }

  // onUsernameInput(name: string) {
  //   if (this.names.length < 5) {
  //     if (this.names.find(element => element == name) == name) {
  //       //check if input name is dublicate
  //       console.log("This name is already taken");
  //       return 0;
  //     } else {
  //       this.names.push(name);
  //       this.DATA_ROW[name] = 0;
  //       this.displayedColumns = ["No"].concat(this.names.concat(["Bock"]));
  //       try {
  //         this.restCom.addPlayerOnServer({ playerName: name }).subscribe();
  //       } catch (error) {
  //         console.log("RequestError: " + error);
  //       }
  //     }
  //   } else console.log("Too many players");
  // }

  // game_select(cat: string, value) {
  //   this.DATA_ROW_temp[cat] = value;
  // }

  // removeUser() {
  //   this.names.pop();
  // }

  // form_submit() {
  //   //this.player_ids = forkJoin(this.names.map(name => this.restCom.getPlayerID(name)));
  //   //this.player_ids = this.getPlayerIds(this.names)
  //   //console.log(this.player_ids)

  //   // this.player_ids.
  //   this.DATA_ROW = this.DATA_ROW_temp;
  //   if (
  //     this.DATA_ROW.Unter == "" ||
  //     this.DATA_ROW.Gespielt == "" ||
  //     this.DATA_ROW.Farbe == ""
  //   ) {
  //     console.log("Error empty form fields");
  //     this.errorMessage = "Please fill in all fields!";
  //   } else {
  //     this.DATA_ROW.No = this.dataSource.data.length + 1;
  //     let score = this.calc_score(
  //       this.DATA_ROW.Farbe,
  //       this.DATA_ROW.Unter,
  //       this.DATA_ROW.Specs,
  //       this.DATA_ROW.Bock
  //     );

  //     //set score of other players to 0
  //     for (var index in this.names) {
  //       this.DATA_ROW[this.names[index]] = 0;
  //     }

  //     //set score to player who has played the game
  //     this.DATA_ROW[this.DATA_ROW.Gespielt] = score;
  //     if (score > this.highscore) {
  //       this.highscore = score;
  //     }

  //     this.gameTable.push(score);
   

  //     this.ELEMENT_DATA.push(this.DATA_ROW);


  //     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); //ELEMENT_DATA goes to sourceData for table
  //     this.setTableData();

  //     if (this.DATA_ROW.No == 1) {
  //       this.restCom
  //         .addGameOnServer({ playerList: this.names })
  //       //   .pipe(
  //       //     switchMap(() => this.restCom.getLatestGameId),
  //       //     switchMap(id => this.restCom.addGameParticipants(id, [1, 2, 3]))
  //       //   )
  //         .toPromise();
  //     }
  //     this.restCom.addGameDetailsOnServer(this.DATA_ROW).toPromise();
  //    // this.restCom.getGameDetailsCurrentGame();
  //     // this.restCom.getGameDetailsCurrentGame().toPromise().then(data => {
  //     //   this.gameDetails = data; console.log(this.gameDetails)
  //     // });
  //     //---------------------------------------------------------------------------------------------------------
  //     //Todooooo Reset Data ROw
  //     this.createGameTable();
  //     this.DATA_ROW = this.DATA_ROW_temp = {
  //       No: 0,
  //       Unter: "",
  //       Farbe: "",
  //       Specs: [],
  //       Bock: false,
  //       Gespielt: ""
  //     };
  //     this.submit = true;
  //     this.errorMessage = "";
  //   }
  // }

  // // highscore(){
  // //   this.restCom.getHighScoreCurrentGame().subscribe(data => {
  // //     this.highscores = data;
  // //   });

  // // }

  // calc_score(farbe, unter, specs, bock) {
  //   let wert = 0;
  //   let mult = parseInt(unter.split(" ")[1]) + 1; //num unter
  //   let score = 0;

  //   switch (farbe) {
  //     case "Eichel":
  //       wert = 12;
  //       break;
  //     case "Grün":
  //       wert = 11;
  //       break;
  //     case "Rot":
  //       wert = 10;
  //       break;

  //     case "Schell":
  //       wert = 9;
  //       break;

  //     case "Null":
  //       wert = 23;
  //       break;

  //     case "Grand":
  //       wert = 24;
  //       break;

  //     case "Ramsch":
  //       wert = 0;
  //       break;
  //   }

  //   if (specs.length > 0) mult += specs.length;
  //   if (bock == true) mult *= 2;

  //   if (farbe !== "Null" || farbe !== "Ramsch") {
  //     score = wert * mult;
  //   }
  //   return score;
  // }

  // sendServerDataRow(DATA_ROW) {
  //   this.restCom.sendServerDataRow(DATA_ROW).subscribe(console.log);
  // }

  // //resets values of data row to initial
  // resetDataRow() {
  //   this.DATA_ROW.No = 0;
  //   this.DATA_ROW.Unter = "";
  //   this.DATA_ROW.Farbe = "";
  //   this.DATA_ROW.Gespielt = "";
  //   this.DATA_ROW.Specs = [];
  //   this.DATA_ROW.Bock = false;
  // }

  // setElementData(gameDetailsAsDict) {
  //   var detailsAsList = [];
  //   console.log(gameDetailsAsDict);
  //   for (var key in gameDetailsAsDict["currentGameDetails"]) {
  //     detailsAsList.push(gameDetailsAsDict["currentGameDetails"][key]);
  //   }
  //   return detailsAsList;
  // }

  // createGameTable() {
  //   this.restCom.setGameTable(this.gameTable);
  // }

  // setTableData() {
  //   this.restCom.setTableData(this.dataSource);
  // }

  // getPlayerIds(names){
  //   var temp_players=[];
  //   for (var index in names){
  //     this.restCom.getPlayerID(names[index]).toPromise().then(x => temp_players.push(x))
  //   }
  //   return temp_players
  // }
   
}
