import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPlayer, isCorrect } from 'src/assets/classes/player';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  // players of game
  @Input()
  players: IPlayer[] = [] 
  // players to choose from 
  @Input()
  allPlayers: IPlayer[] = []
  // notify if selected players change (e.g. submit button)
  @Output()
  playersChange = new EventEmitter<IPlayer[]>()
 
  constructor() { }

  ngOnInit() {
  }


  togglePlayer(player: IPlayer) {
    const index = this.players.indexOf(player)

    if (index > -1 ) {
      this.players.splice(index, 1)
      this.playersChange.next(this.players)
    } else {
      this.players.push(player)
      this.playersChange.next(this.players)
    }
  }
}
