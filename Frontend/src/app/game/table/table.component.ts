import { Component, OnInit, OnChanges, Input, HostListener, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { RestComService } from "../../rest-com.service.old";
import { trigger, transition, state, style, animate } from '@angular/animations';
import { IPlayer } from 'src/assets/classes/player';
import { ApiService } from 'src/app/api.service';
import { IRound } from 'src/assets/classes/round';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  animations: [
    trigger('fade', [
      transition('void => *', [
      style({
        opacity: 0
      }),
      animate('500ms')
      ]),
      transition('* => *', animate('500ms')),
    ])
  ]
})
export class TableComponent implements OnInit {

  @Input() players: Observable<IPlayer[]>; 
   _rounds: Observable<IRound[]>;

  @Input()
  set rounds(rounds: Observable<IRound[]>) {
    this._rounds = rounds.pipe()
  }

  get rounds() {
    return this._rounds
  }
   constructor( ) {}

  ngOnInit() { 
    
  }

  get displayedColumns(): Observable<string[]> {
    return this.players.pipe(
      map(players => players.map(player => player.name)),
      tap(playerNames => playerNames.unshift("number"))
    )
  }

  getScore(round: IRound, player: IPlayer): number {
    if (round.playerID  == player.playerID) {
      return round.score
    }
    return 0 
  }
  getScoreSum() {
    return "TODO"
    }
  }