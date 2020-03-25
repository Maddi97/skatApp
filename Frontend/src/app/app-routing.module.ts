import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { NewGameComponent } from './newGame/newGame.component';
import { BodyComponent } from './body/body.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  { path: 'newGame', component: NewGameComponent },
  { path: 'index', component: BodyComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: 'game', component: GameComponent},
  { path: '**', redirectTo: 'index' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
