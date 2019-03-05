import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';



import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { GameComponent } from './game/game.component';
import { BodyComponent } from './body/body.component';

const routes = [
  { path: 'game', component: GameComponent },
  { path: 'index', component: BodyComponent },
  { path: '**', redirectTo: 'index' }

]

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GameComponent,
    BodyComponent
  ],
  imports: [

    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
