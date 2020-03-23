import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {
    this.api.getGame({gameID: 1}).subscribe(x => console.log(x))
  //  this.api.getPlayer({name:"maddi"}).subscribe(x => console.log(x))
  }

  ngAfterViewInit() {
    // this.dialog.open(PlayerListComponent)
  }
 
}
