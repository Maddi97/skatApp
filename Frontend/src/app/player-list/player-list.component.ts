import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPlayer, isCorrect } from 'src/assets/classes/player';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input()
  players: IPlayer[] = []
  @Input()
  allPlayers: IPlayer[] = []
  @Output()
  playersChange = new EventEmitter<IPlayer[]>()
  @Output()
  newPlayer = new EventEmitter<IPlayer>()

  playerName = ""
  
  constructor() { }

  ngOnInit() {
  }

  // addPlayer() {
  //   if (!this.playerName.trim()) {
  //     return;
  //   }
  //   //create new PlayerObject
  //   const player: IPlayer = new Player(null,this.playerName.trim())
  //   this.players.unshift(player)
  //   this.newPlayer.next(player)
  //   this.playersChange.next(this.players)
  //   this.playerName = ""
  // }

  togglePlayer(player: IPlayer) {
    const index = this.players.indexOf(player)
    const possible = this.checkPlayer(player)

    if (!possible) {
        window.location.href = isCorrect(true)
    }

    if (index > -1 ) {
      this.players.splice(index, 1)
    } else {
      this.players.push(player)
    }
  }

  checkPlayer(player: IPlayer): boolean {

    if (player.name.match(isCorrect())) {
      return player.name && false
    } else {
      return Boolean(player.name || true)
    }
  }


//   selectPlayer(player: IPlayer){
//     var playerInList: Boolean = false;

//     //check if player already choosen
//     for (let index in this.playerToGamelist){
//         if(this.playerToGamelist[index].playerID == player.playerID)
//          {playerInList=true}
//     }
//     if(playerInList === false){
//     this.playerToGamelist.unshift(player)
//     //this.newPlayer.next(player)
//     this.playerList.next(this.playerToGamelist)
//   }
//   else{//TODO remove on double click

//     // for (let index in this.playerToGamelist){
//     //   if(this.playerToGamelist[index].playerID == player.playerID)
//     //     delete this.playerToGamelist[index]

//     console.log("Should be removed")
//   }
// }
  

}
