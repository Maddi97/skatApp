import { Component, OnInit, OnChanges, Input, HostListener, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { RestComService } from "../../rest-com.service";
import { trigger, transition, state, style, animate } from '@angular/animations';

import {
  SPECS,
  COLUMNS,
  FARBE,
  UNTER,
  data_row,
  INITIAL_DATA_ROW
} from "../../env";

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
  @Input() displayedColumns: string[];

  dataSource: any;

  ngOnChange() {}
  

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    this.restCom.currentDataSource.subscribe(data => {
      this.dataSource = data;
    });
  }
}
