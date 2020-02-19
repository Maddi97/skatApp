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
  // @Input() table: number[] = [];
  table: number[];
  gameData: data_row[];
  ELEMENT_DATA: data_row[] = [];
  counter: number = 0;

  tables: any;
  lineChartData: ChartDataSets[] = [{ label: "Points" }];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: "#343a40",
      backgroundColor: "rgba(255,255,0,0.28)"
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    // console.log('1',this.table);
    // console.log('2',this.lineChartData);
    // this.restCom.currentGameDetails.subscribe(data => {
    //   this.ELEMENT_DATA.push(data);
    //   this.lineChartData = [{ data: this.ELEMENT_DATA[this.counter]['johann'] }];
    //  });

    var dictionary = this.restCom.getAllRoundsOfAllPlayerPerGame();
    console.log(dictionary);
    var keyList = Object.keys(dictionary);

    for (var index in keyList) {
      console.log("player: " + keyList[index]);
      console.log(keyList[index] + ": " + dictionary[keyList[index]]);
    }

    this.restCom.currentGameTable.subscribe(data => {
      this.table = data;
      console.log("3", this.table);
      this.lineChartData = [{ data: this.table }];
      this.lineChartLabels.push(this.counter.toString());
      this.counter++;
    });
  }
}
