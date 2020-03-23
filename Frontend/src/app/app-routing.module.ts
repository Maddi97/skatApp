import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BodyComponent } from './body/body.component';
import { HighscoreComponent } from './highscore/highscore.component';


const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'index', component: BodyComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: '**', redirectTo: 'index' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
