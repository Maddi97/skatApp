import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { IPlayer, Player } from 'src/assets/classes/player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  @Output()
  newPlayer = new EventEmitter<IPlayer>()

  playerName = ""

  constructor( ) { }

  ngOnInit() { }

  addPlayer(){
    //Jacob is never valid lol
    if (this.playerName.toLowerCase().includes('acob')) {
      this.playerName = "Jakob";
    }

    if (this.playerName.trim() == "") {
      return
    }

    const newPlayer: IPlayer = {name: this.playerName.trim()}
    this.newPlayer.emit(newPlayer)
    this.playerName = "";
  }

}
