import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions, RadialChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { RestComService } from "../../rest-com.service";
import { data_row } from "../../env";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"]
})
export class ChartsComponent implements OnInit {
  @Input() dataOption: String = "";
  @Input() isLabel: boolean = true;

  //chart variables
  chartOpLine: boolean = false;
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartOptions: RadialChartOptions = {
    responsive: true
  };
  chartColors: Color[] = [
    {
      borderColor: "#343a40",
      backgroundColor: "rgba(255,255,0,0.28)"
    }
  ];
  chartType = "line";
  //data
  dataType: any;
  keyList: string[] = [];

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    switch (this.dataOption) {
      case "HighestScoresOfAllTime":
        this.chartOpLine = true;
        try {
          var highestScoresOfAllTime = this.restCom.getHighestScoresOfAllTime();
        } catch (error) {
          console.log("Error call on  getHighestScoresOfAllTime: " + error);
        }
        try {
          var keyList = this.restCom.getPlayerCurrentGame()["playerList"]; //Object.keys(highestScoresOfAllTime);
        } catch (error) {
          console.log("Error call on  getPlayerCurrentGame(): " + error);
          keyList = ["Johann", "Maddi", "Johan"];
        }
        for (var index in keyList) {
          // console.log("player: " + keyList[index]);
          // console.log(
          //   keyList[index] + ": " + highestScoresOfAllTime[keyList[index]]
          // );
          this.dataType = {
            label: keyList[index],
            data: highestScoresOfAllTime[keyList[index]]
          };
          if (this.chartData.length > 0) {
            this.chartData.push(this.dataType);
          } else {
            this.chartData = [this.dataType];
          }
          this.chartLabels = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
          ];
        }
        break;
      case "BestPlayer":
        this.chartOpLine = true;
        try {
          var bestPlayer = this.restCom.getBestPlayerScores();
        } catch (error) {
          console.log("Error call on getBestPlayerScores: " + error);
        }
        try {
          var keyList = this.restCom.getPlayerCurrentGame()["playerList"]; //Object.keys(bestPlayer);
        } catch (error) {
          console.log("Error call on getPlayerCurrentGame: " + error);
          keyList = ["Johann", "Maddi", "Johan"];
        }
        for (var index in keyList) {
          // console.log("player: " + keyList[index]);
          // console.log(keyList[index] + ": " + bestPlayer[keyList[index]]);
          this.dataType = {
            label: keyList[index],
            data: bestPlayer[keyList[index]]
          };
          if (this.chartData.length > 0) {
            this.chartData.push(this.dataType);
          } else {
            this.chartData = [this.dataType];
          }
          this.chartLabels = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
          ];
        }
        break;
      case "MostPlayedHands":
        this.chartOpLine = true;
        this.chartType = "radar";
        var mostPlayedHands = this.restCom.getMostPlayedHands();
        var keyList = Object.keys(mostPlayedHands);

        for (var index in keyList) {
          this.dataType = {
            label: keyList[index],
            data: mostPlayedHands[keyList[index]]
          };
          if (this.chartData.length > 0) {
            this.chartData.push(this.dataType);
          } else {
            this.chartData = [this.dataType];
          }
          this.chartLabels = [
            "rot",
            "eichel",
            "grün",
            "schell",
            "grand",
            "null",
            "ramsch"
          ];
        }
        break;
      case "HighscoreCurrentGame":
        this.chartOpLine = true;
        var highscoreCurrentGame = this.restCom.getAllRoundsOfAllPlayerPerGame();
        var keyList = Object.keys(highscoreCurrentGame);
        for (var index in keyList) {
          //console.log("player: " + keyList[index]);
          // console.log(
          // keyList[index] + ": " + highscoreCurrentGame[keyList[index]]
          // );
          this.dataType = {
            label: keyList[index],
            data: highscoreCurrentGame[keyList[index]]
          };
          if (this.chartData.length > 0) {
            this.chartData.push(this.dataType);
          } else {
            this.chartData = [this.dataType];
          }
          this.chartLabels = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10"
          ];
        }
        break;
    }
  }
}
