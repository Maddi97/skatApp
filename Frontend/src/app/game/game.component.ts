import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dialog.open(PlayerListComponent)
  }
 
}
