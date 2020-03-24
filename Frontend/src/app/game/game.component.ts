import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PlayerListComponent } from '../player-list/player-list.component';
import { ApiService } from '../api.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {
    const a= this.api.getGame({gameID: 1})
    a.subscribe(x => console.log(x))
    const b= a.pipe(
      switchMap(x => this.api.getPlayer({name: "Maddi"}))
    )
    b.subscribe(x => console.log(x))
    b.pipe(
      switchMap(x => this.api.getRound({gameID: 1, playerID: 1}))
    ).subscribe(x => console.log(x))
  //  this.api.getPlayer({name:"maddi"}).subscribe(x => console.log(x))
  }

  ngAfterViewInit() {
    // this.dialog.open(PlayerListComponent)
  }
 
}
