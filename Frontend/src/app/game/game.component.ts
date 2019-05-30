import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material"
import { HttpClient } from '@angular/common/http';
import { RestComService } from '../rest-com.service';

export interface Number {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  
  specs_form = new FormControl();
  specs: string[] = ['Hand', 'Schneider', 'Schwarz', 'Ouvert']

  displayedColumns: string[];
  names: string[] = Array();


  columns: string[] = ['Unter', 'Farbe', 'Specs', 'Bock', 'Gespielt']
  farbe: string[] = ['Eichel', 'Grün', 'Rot', 'Schell', 'Grand', 'Null', 'Ramsch']
  unter: string[] = ['Mit 1', 'Mit 2', 'Mit 3', 'Mit 4', 'Ohne 1', 'Ohne 2', 'Ohne 3', 'Ohne 4']

  selected_player: string;

  DATA_ROW={
    No: 0, Unter: '', Farbe: '', Specs:[], Bock: false, Gespielt: ''
  }


  
  ELEMENT_DATA=[] 

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
 

  constructor(private restCom: RestComService) { 
    
   }

  ngOnInit() {
    this.getServerHello()
    this.sendServerHello()
  }


  onUsernameInput(name:string){  
    this.names.push(name)
    this.DATA_ROW[name]=0;
    this.displayedColumns = ['No'].concat(this.names.concat(this.columns));

  }

  game_select(cat: string, value){
    this.DATA_ROW[cat]=value;
    console.log(this.DATA_ROW)
  }
  removeUser(){
    this.names.pop()
  }

  form_submit(){

    
    if(this.DATA_ROW.Unter =='' || this.DATA_ROW.Gespielt == '' || this.DATA_ROW.Farbe==''){
      
     //TODO
     
     console.log("Error empty form fields")
    }
    else{
        this.DATA_ROW.No = this.dataSource.data.length +1 

        let score = this.calc_score(this.DATA_ROW.Farbe, this.DATA_ROW.Unter, this.DATA_ROW.Specs,this.DATA_ROW.Bock)
        this.DATA_ROW[this.DATA_ROW.Gespielt] = score;
        const data = this.dataSource.data;
        data.push(this.DATA_ROW);
        this.dataSource.data = data


        //Todooooo Reset Data ROw
        this.DATA_ROW = {
          No: 0,  Unter: '', Farbe: '', Specs:[], Bock: false, Gespielt: ''
        }
    }
  }

  calc_score(farbe, unter, specs, bock){
    let wert=0;
    let mult = parseInt(unter.split(' ')[1])+1 //num unter
    let score =0;
    
    switch(farbe) {
      case 'Eichel': wert = 12;
                     break;
      case 'Grün': wert = 11;
                   break;
      case 'Rot': wert = 10;
                   break;
      
      case 'Schell': wert = 9;
                   break;
          
      case 'Null': wert = 23;
                   break;

      case 'Grand': wert = 24;
                    break;
      
      case 'Ramsch': wert = 0;
                    break;
    }

    if(specs.length > 0) mult += specs.length;
    if(bock == true) mult *= 2;

    if(farbe !== 'Null' || farbe != 'Ramsch'){
      score = wert * mult
    }
    return score;

  }

  getServerHello(){
    console.log(this.restCom.getServerHello())
  }

  sendServerHello(){
    console.log(this.restCom.sendServerHello().subscribe())
  }
  
}


