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
import { Observable } from 'rxjs';

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

  @Input() players: IPlayer[];
  @Input() rounds: IRound[] = [];

  displayedColumns: string[];

   constructor(
     private api: ApiService,
    ) {}

  ngOnInit() { 
    console.log(this.players);
    this.displayedColumns = this.players.map(m => m.name);
    console.log(this.rounds);

  }
}
