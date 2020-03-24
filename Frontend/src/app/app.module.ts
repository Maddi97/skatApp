import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { NewGameComponent } from './newGame/newGame.component';
import { BodyComponent } from './body/body.component';
import { ChartsComponent } from './game-old/charts/charts.component';
import { TableComponent } from './game-old/table/table.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { GradientButtonComponent } from './gradient-button/gradient-button.component';

//Charts
import { ChartsModule } from 'ng2-charts';
import { PlayerListComponent } from './player-list/player-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderInterceptor } from './header-interceptor';
import { GameComponent } from './game/game.component';
import { JSONInterceptor } from './json-interceptor';
import { RoundFormComponent } from './round-form/round-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NewGameComponent,
    BodyComponent,
    ChartsComponent,
    TableComponent,
    HighscoreComponent,
    GradientButtonComponent, 
    PlayerListComponent, GameComponent, RoundFormComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    ChartsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JSONInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlayerListComponent]
})
export class AppModule { }
