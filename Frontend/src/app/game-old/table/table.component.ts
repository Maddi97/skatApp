import { Component, OnInit, OnChanges, Input, HostListener, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { RestComService } from "../../rest-com.service.old";
import { trigger, transition, state, style, animate } from '@angular/animations';

import {
  SPECS,
  COLUMNS,
  FARBE,
  UNTER,
  data_row,
  INITIAL_DATA_ROW
} from "../../env";
import { IPlayer } from 'src/assets/classes/player';
import { ApiService } from 'src/app/api.service';
import { IRound } from 'src/assets/classes/round';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  animations: [
    trigger('fade', [
      transition('void => *', [
      style({
        opacity: 0
      }),
      animate('500ms')
      ]),
      transition('* => *', animate('500ms')),
    ])
  ]
})
export class TableComponent implements OnInit {

  @Input() player: IPlayer[];
  @Input() rounds: IRound[];

  displayedColumns: string[];


  // dataSource: any;

  // ngOnChange() {}
  

   constructor(
     private api: ApiService,
    ) {}

  ngOnInit() { 
    this.displayedColumns = this.player.map(m => m.name);
    this.rounds[0].score = 24;
  }
  
}
