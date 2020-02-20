import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { RestComService } from "../../rest-com.service";
import { data_row } from "../../env";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"]
})
export class ChartsComponent implements OnInit {
  @Input() dataOption: String = '';

  table: number[];
  gameData: data_row[];
  ELEMENT_DATA: data_row[] = [];
  counter: number = 0;

  tables: any;
  chartOpLine: boolean = false;
  chartOpRadar: boolean = false;
  chartData: ChartDataSets[] = [{ }];

  chartLabels: Label[] = [];

  chartOptions = {
    responsive: true
  };

  chartColors: Color[] = [
    {
      borderColor: "#343a40",
      backgroundColor: "rgba(255,255,0,0.28)"
    }
  ];

  chartType = "line";

  dataType: any;

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    switch (this.dataOption) {
      case "HighestScoresOfAllTime":
        this.chartOpLine=true;
        var highestScoresOfAllTime = this.restCom.getHighestScoresOfAllTime();
        var keyList = Object.keys(highestScoresOfAllTime);
    
        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(keyList[index] + ": " + highestScoresOfAllTime[keyList[index]]);
          this.dataType = { label: keyList[index], data: highestScoresOfAllTime[keyList[index]] };
          this.chartData.push(this.dataType);
          this.chartLabels = ['1','2','3','4','5','6','7','8','9','10'];
        }
      break;
      case "BestPlayer":
        this.chartOpLine=true;
        var bestPlayer = this.restCom.getBestPlayerScores();
        var keyList = Object.keys(bestPlayer);
    
        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(keyList[index] + ": " + bestPlayer[keyList[index]]);
          this.dataType = { label: keyList[index], data: bestPlayer[keyList[index]] };
          this.chartData.push(this.dataType);
          this.chartLabels = ['1','2','3','4','5','6','7','8','9','10'];
        }
        break;
      case "MostPlayedHands":
        this.chartOpRadar = true;
        this.chartType = 'radar';
        var mostPlayedHands = this.restCom.getMostPlayedHands();
        var keyList = Object.keys(mostPlayedHands);
    
        for (var index in keyList) {
          console.log("player: " + keyList[index]);
          console.log(keyList[index] + ": " + mostPlayedHands[keyList[index]]);
          this.dataType = { label: keyList[index], data: mostPlayedHands[keyList[index]] };
          this.chartData.push(this.dataType);
          this.chartLabels = ['rot','eichel','grün','schell','grand','null','ramsch'];
        }
        console.log(this.chartData.length);
        break;
      case "HighscoreCurrentGame":
        this.chartOpLine = true;
          var highscoreCurrentGame = this.restCom.getAllRoundsOfAllPlayerPerGame();
          var keyList = Object.keys(highscoreCurrentGame);
          for (var index in keyList) {
            console.log("player: " + keyList[index]);
            console.log(keyList[index] + ": " + highscoreCurrentGame[keyList[index]]);
            this.dataType = { label: keyList[index], data: highscoreCurrentGame[keyList[index]] };
            this.chartData.push(this.dataType);

            this.chartLabels = ['1','2','3','4','5','6','7','8','9','10'];
          }
        break;
    }

    // this.restCom.currentGameTable.subscribe(data => {
    //   this.table = data;
    //   console.log("3", this.table);
    //   this.lineChartData = [{ data: this.table }];
    //   this.lineChartLabels.push(this.counter.toString());
    //   this.counter++;
    // });
  }
}
