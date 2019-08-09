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

  displayedColumns: string[];
  names: string[] = Array();

  selected_player: string;

  DATA_ROW: data_row = INITIAL_DATA_ROW;
  DATA_ROW_temp: data_row = INITIAL_DATA_ROW;

  ELEMENT_DATA: data_row[] = [];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private restCom: RestComService) {}

  ngOnInit() {}

  onUsernameInput(name: string) {
    this.names.push(name);
    this.DATA_ROW[name] = 0;
    this.displayedColumns = ["No"].concat(this.names.concat(this.columns));

    this.restCom.addPlayerOnServer({ playerName: name }).subscribe();
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
      //TODO

      console.log("Error empty form fields");
    } else {
      this.DATA_ROW.No = this.dataSource.data.length + 1;
      let score = this.calc_score(
        this.DATA_ROW.Farbe,
        this.DATA_ROW.Unter,
        this.DATA_ROW.Specs,
        this.DATA_ROW.Bock
      );
      this.DATA_ROW[this.DATA_ROW.Gespielt] = score;
      let data = this.dataSource.data;
      this.dataSource.data = data;

      if (this.DATA_ROW.No == 1) {
        this.restCom.addGameOnServer({ playerList: this.names }).subscribe();
      }

      //this.restCom.addGameDetailsOnServer(this.DATA_ROW).subscribe();

      //Todooooo Reset Data ROw
      this.DATA_ROW = INITIAL_DATA_ROW;
    }
  }

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

    if (farbe !== "Null" || farbe != "Ramsch") {
      score = wert * mult;
    }
    return score;
  }

  getServerHello() {
    this.restCom.getServerHello();
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
}
