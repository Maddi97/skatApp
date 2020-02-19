import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { RestComService } from "../../rest-com.service";

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
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  // @Input() dataSource: any;
  @Input() displayedColumns: string[];

  dataSource: any;

  ngOnChange() {}

  constructor(private restCom: RestComService) {}

  ngOnInit() {
    this.restCom.currentDataSource.subscribe(data => {
      this.dataSource = data;
      console.log("bbk", data);
    });
  }
}
