import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from '../game/charts/charts.component';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {
  option: string[] = ["HighestScoresOfAllTime","BestPlayer","MostPlayedHands"];
  constructor() { }

  ngOnInit() {
  }

}
