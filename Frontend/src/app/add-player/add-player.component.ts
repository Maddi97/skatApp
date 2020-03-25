import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { IPlayer, Player } from 'src/assets/classes/player';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  @Output()
  newPlayer = new EventEmitter<IPlayer>()
  
  @Input()
  restrictedNames: string[] = []

  playerName = new FormControl("", {
    validators: (control) => {
      const errors: ValidationErrors = {}
      if (control.value.trim() == "" || this.restrictedNames.includes(control.value)) {
        errors["error"] = "true";
      }
      return errors
       
    }
  })

  constructor( ) { }

  ngOnInit() { }

  addPlayer(){
    //Jacob is never valid lol
    if (this.playerName.value.toLowerCase().includes('acob')) {
      this.playerName.setValue("Jakob");
    }

    const newPlayer: IPlayer = {name: this.playerName.value.trim()}
    this.newPlayer.emit(newPlayer)
    this.playerName.setValue("");
  }

}
