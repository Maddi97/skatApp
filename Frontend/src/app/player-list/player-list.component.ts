import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Player, IPlayer } from 'src/assets/classes/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input()
  players: IPlayer[] = [
    {playerID: 1, name: "maddi1"},
    {playerID: 2, name: "maddi2"},
    {name: "maddi3"},
  ]
  @Output()
  playersChange = new EventEmitter<IPlayer[]>()
  @Output()
  newPlayer = new EventEmitter<IPlayer>()

  playerName = ""

  constructor() { }

  ngOnInit() {
  }

  addPlayer() {
    if (!this.playerName.trim()) {
      return;
    }
    const player: IPlayer = {playerID: null, name: this.playerName.trim()}
    this.players.unshift(player)
    this.newPlayer.next(player)
    this.playersChange.next(this.players)
    this.playerName = ""
  }


}
