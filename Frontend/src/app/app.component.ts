import { Component, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PlayerListComponent } from './player-list/player-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Skat App';

  constructor(private snackBar: MatDialog) {}

  ngOnInit(){
  }

  ngAfterViewInit() {
    this.snackBar.open(PlayerListComponent)
  }
}
