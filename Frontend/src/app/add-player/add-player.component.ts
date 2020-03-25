import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IPlayer, Player } from 'src/assets/classes/player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  inputName: string;
  newPlayer: IPlayer = {};
  newPlayers: Player[] = [];
  allPlayer: Player[] = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getAllPlayer().subscribe(res => {
      this.allPlayer = res;
    })
  }

  addPlayer(){
    //Jacob is never valid lol
    if ( this.inputName.toLowerCase().includes('acob') ) {
      this.inputName = "Jakob";
    }
    if ( this.allPlayer.map(m => m.name.toLowerCase()).includes(this.inputName.toLowerCase()) ){
      console.warn('username already in use');
      return;
    }
    this.newPlayer.name = this.inputName;
    this.api.addPlayer(this.newPlayer).subscribe((res: Player) => {
      this.newPlayers.push(res);
    });
    this.inputName = "";
  }

}
