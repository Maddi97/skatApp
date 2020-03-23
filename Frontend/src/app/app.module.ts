import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { GameComponent } from './game/game.component';
import { BodyComponent } from './body/body.component';
import { ChartsComponent } from './game-old/charts/charts.component';
import { TableComponent } from './game-old/table/table.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { GradientButtonComponent } from './gradient-button/gradient-button.component';

//Charts
import { ChartsModule } from 'ng2-charts';
import { PlayerListComponent } from './player-list/player-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultInterceptor } from './default-interceptor';

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
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlayerListComponent]
})
export class AppModule { }
