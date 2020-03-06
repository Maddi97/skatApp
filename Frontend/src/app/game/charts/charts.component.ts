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
<<<<<<< HEAD
  @Input() dataOption: String = "";
=======
  @Input() dataOption: String = '';
  @Input() isLabel: boolean = true;
>>>>>>> b58183e81c1142e1ffdbaf5d0c4a9d7ac72fb423

  //chart variables
  chartOpLine: boolean = false;
<<<<<<< HEAD
  chartData: ChartDataSets[] = [{}];

=======
  chartData: ChartDataSets[] = [{ }];
>>>>>>> b58183e81c1142e1ffdbaf5d0c4a9d7ac72fb423
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
  keyList: string[];

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    console.log(this.restCom.getPlayerCurrentGame());
    switch (this.dataOption) {
      case "HighestScoresOfAllTime":
        this.chartOpLine = true;
        var highestScoresOfAllTime = this.restCom.getHighestScoresOfAllTime();
        var keyList = this.restCom.getPlayerCurrentGame()["playerList"]; //Object.keys(highestScoresOfAllTime);

        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(
            keyList[index] + ": " + highestScoresOfAllTime[keyList[index]]
          );
          this.dataType = {
            label: keyList[index],
            data: highestScoresOfAllTime[keyList[index]]
          };
          this.chartData.push(this.dataType);
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
        var bestPlayer = this.restCom.getBestPlayerScores();
        var keyList = this.restCom.getPlayerCurrentGame()["playerList"]; //Object.keys(bestPlayer);

        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(keyList[index] + ": " + bestPlayer[keyList[index]]);
          this.dataType = {
            label: keyList[index],
            data: bestPlayer[keyList[index]]
          };
          this.chartData.push(this.dataType);
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
          console.log("player: " + keyList[index]);
          console.log(keyList[index] + ": " + mostPlayedHands[keyList[index]]);
          this.dataType = {
            data: mostPlayedHands[keyList[index]],
            label: keyList[index]
          };
          this.chartData.push(this.dataType);
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
        console.log(this.chartData.length);
        break;
      case "HighscoreCurrentGame":
        this.chartOpLine = true;
        var highscoreCurrentGame = this.restCom.getAllRoundsOfAllPlayerPerGame();
        var keyList = Object.keys(highscoreCurrentGame);
        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(
            keyList[index] + ": " + highscoreCurrentGame[keyList[index]]
          );
          this.dataType = {
            label: keyList[index],
            data: highscoreCurrentGame[keyList[index]]
          };
          this.chartData.push(this.dataType);

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
