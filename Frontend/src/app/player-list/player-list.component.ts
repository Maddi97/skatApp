import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Player, IPlayer } from 'src/assets/classes/player';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input()
  allExistingPlayer: IPlayer[] = []
  @Input()
  playerToGamelist: IPlayer[]=[]
  @Output()
  playersChange = new EventEmitter<IPlayer[]>()
  @Output()
  newPlayer = new EventEmitter<IPlayer>()
  @Output()
  playerList = new EventEmitter<IPlayer[]>()


  playerName = ""

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  addPlayer() {
    if (!this.playerName.trim()) {
      return;
    }
    //create new PlayerObject
    const player: IPlayer = new Player(null,this.playerName.trim())
    //write Player to database and set new playerID to received one
    // this.api.addPlayer(player).subscribe(player_from_server => player.setPlayerID(player_from_server.playerID))
    this.allExistingPlayer.unshift(player)
    this.newPlayer.next(player)
    this.playersChange.next(this.allExistingPlayer)
    this.playerName = ""
  }

  selectPlayer(player: IPlayer){
    var playerInList: Boolean = false;

    //check if player already choosen
    for (let index in this.playerToGamelist){
        if(this.playerToGamelist[index].playerID == player.playerID)
         {playerInList=true}
    }
    if(playerInList === false){
    this.playerToGamelist.unshift(player)
    //this.newPlayer.next(player)
    this.playerList.next(this.playerToGamelist)
  }
  else{//TODO remove on double click

    // for (let index in this.playerToGamelist){
    //   if(this.playerToGamelist[index].playerID == player.playerID)
    //     delete this.playerToGamelist[index]

    console.log("Should be removed")
  }
}
  

}
