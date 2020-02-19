import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BodyComponent } from './body/body.component';
import { HighscoreComponent } from './highscore/highscore.component';


@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
