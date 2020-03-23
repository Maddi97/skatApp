import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { GameComponent } from './game/game.component';
import { BodyComponent } from './body/body.component';
import { ChartsComponent } from './game/charts/charts.component';
import { TableComponent } from './game/table/table.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { GradientButtonComponent } from './gradient-button/gradient-button.component';

//Charts
import { ChartsModule } from 'ng2-charts';
import { PlayerListComponent } from './player-list/player-list.component';

const routes = [
  { path: 'game', component: GameComponent },
  { path: 'index', component: BodyComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: '**', redirectTo: 'index' }

]

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GameComponent,
    BodyComponent,
    ChartsComponent,
    TableComponent,
    HighscoreComponent,
    GradientButtonComponent, 
    PlayerListComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerListComponent]
})
export class AppModule { }
