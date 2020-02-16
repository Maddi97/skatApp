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

//Charts
import { ChartsModule } from 'ng2-charts';

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
    BodyComponent,
    ChartsComponent,
    TableComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
