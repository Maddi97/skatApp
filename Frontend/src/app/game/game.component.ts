import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { RestComService } from "../rest-com.service";


//constants import

import {
  SPECS,
  COLUMNS,
  FARBE,
  UNTER,
  data_row,
  INITIAL_DATA_ROW
} from "../env";

import { scheduleMicroTask } from '@angular/core/src/util';   

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  // constant definitions
  specs_form = new FormControl();
  specs = SPECS;
  columns = COLUMNS;
  farbe = FARBE;
  unter = UNTER;

  chartOption: string[] = ["HighscoreCurrentGame"];

  displayedColumns: string[];
  names: string[] = Array();

  selected_player: string;
  gameDetails: any;
  data: any;
  highscore: number = 0;
  gameTable: number[] = [];
  errorMessage: string = '';

  DATA_ROW: data_row = INITIAL_DATA_ROW;
  DATA_ROW_temp: data_row = INITIAL_DATA_ROW;

  ELEMENT_DATA: data_row[] = [];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  submit: boolean = false;

  constructor(
    private restCom: RestComService,
    ) {}

  ngOnInit() {
  }

  onUsernameInput(name: string) {
    if(this.names.length < 5 ){
    this.names.push(name);
    this.DATA_ROW[name] = 0;
    this.displayedColumns = ["No"].concat(this.names.concat(["Bock"]));
    // this.displayedColumns = this.names.concat(["Bock"]);
    this.restCom.addPlayerOnServer({ playerName: name }).subscribe();
    }
  }

  game_select(cat: string, value) {
    this.DATA_ROW_temp[cat] = value;
  }
  removeUser() {
    this.names.pop();
  }

  form_submit() {
    this.DATA_ROW = this.DATA_ROW_temp;
    if (
      this.DATA_ROW.Unter == "" ||
      this.DATA_ROW.Gespielt == "" ||
      this.DATA_ROW.Farbe == ""
    ) {
      console.log("Error empty form fields");
      this.errorMessage = 'Please fill in all fields!';
    } else {
      this.DATA_ROW.No = this.dataSource.data.length + 1;
      let score = this.calc_score(
        this.DATA_ROW.Farbe,
        this.DATA_ROW.Unter,
        this.DATA_ROW.Specs,
        this.DATA_ROW.Bock
      );
      this.DATA_ROW[this.DATA_ROW.Gespielt] = score;
      if (score > this.highscore ){
        this.highscore = score;
      }

      this.gameTable.push(score);

      this.ELEMENT_DATA.push(this.DATA_ROW);
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); //ELEMENT_DATA goes to sourceData for table
      
      console.log(this.dataSource);
      this.setTableData();


      if (this.DATA_ROW.No == 1) {
        this.restCom.addGameOnServer({ playerList: this.names }).subscribe();
      }

      this.restCom.addGameDetailsOnServer(this.DATA_ROW).subscribe();
      this.restCom.getGameDetailsCurrentGame();


      // this.restCom.getGameDetailsCurrentGame().toPromise().then(data => {
      //   this.gameDetails = data; console.log(this.gameDetails)
      // });
      //---------------------------------------------------------------------------------------------------------
      //Todooooo Reset Data ROw
      this.createGameTable();
      this.DATA_ROW = this.DATA_ROW_temp = {No: 0, Unter: '', Farbe: '', Specs:[], Bock: false, Gespielt: ''};
      this.submit = true;
      this.errorMessage = '';
    }
  }

  // highscore(){
  //   this.restCom.getHighScoreCurrentGame().subscribe(data => {
  //     this.highscores = data;
  //   });

  // }

  calc_score(farbe, unter, specs, bock) {
    let wert = 0;
    let mult = parseInt(unter.split(" ")[1]) + 1; //num unter
    let score = 0;

    switch (farbe) {
      case "Eichel":
        wert = 12;
        break;
      case "Grün":
        wert = 11;
        break;
      case "Rot":
        wert = 10;
        break;

      case "Schell":
        wert = 9;
        break;

      case "Null":
        wert = 23;
        break;

      case "Grand":
        wert = 24;
        break;

      case "Ramsch":
        wert = 0;
        break;
    }

    if (specs.length > 0) mult += specs.length;
    if (bock == true) mult *= 2;

    if (farbe !== "Null" || farbe !== "Ramsch") {
      score = wert * mult;
    }
    return score;
  }

  sendServerDataRow(DATA_ROW) {
    console.log(this.restCom.sendServerDataRow(DATA_ROW).subscribe());
  }

  resetDataRow() {
    this.DATA_ROW.No = 0;
    this.DATA_ROW.Unter = "";
    this.DATA_ROW.Farbe = "";
    this.DATA_ROW.Gespielt = "";
    this.DATA_ROW.Specs = [];
    this.DATA_ROW.Bock = false;
  }

  setElementData(gameDetailsAsDict) {
    var detailsAsList = [];
    console.log(gameDetailsAsDict);
    for (var key in gameDetailsAsDict["currentGameDetails"]) {
      detailsAsList.push(gameDetailsAsDict["currentGameDetails"][key]);
    }
    return detailsAsList;
  }
  createGameTable(){
    this.restCom.setGameTable(this.gameTable);
  }

  setTableData(){
    this.restCom.setTableData(this.dataSource);
  }
}
