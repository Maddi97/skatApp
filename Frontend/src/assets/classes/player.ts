export interface IPlayer {
     playerID?: number;
     name?: string;
     setPlayerID(playerID:number):void;
     getPlayerID():number;
     setPlayerName(name: string):void;
     getplayerName():string;
}

export class Player implements IPlayer {
    
    playerID: number;
    name:string;

    constructor(playerID: number, name: string) {
        this.playerID=playerID;
        this.name=name;
     }

     setPlayerID(playerID:number){
         this.playerID= playerID
     }
     getPlayerID(){
         return this.playerID
     }
     setPlayerName(name: string){
         this.name=name;
     }
     getplayerName(){
         return this.name
     }
}