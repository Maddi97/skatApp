import { Player } from './player'

export interface IGame {
    gameID?: number;
    date?: string | Date;
    gameRoundAmount?: number;
    players?: Number[] | Player[];

    getGameID();
    setGameID(gameID);
    getDate();
    setDate(date);
    getGameRoundAmount();
    setGameRoundAmount(gameRoundAmount);
    getPlayerList();
    setPlayerList(players)


}

export class Game implements IGame {

    gameID: number;
    date: Date;
    gameRoundAmount: number;  
    players: Player[]


    constructor( gameID: number,  date: Date, 
         gameRoundAmount: number,  players: Player[] ) { 
            this.gameID = gameID;
            this.date = date;
            this.gameRoundAmount=gameRoundAmount;
            this.players=players

         }

    
    public getGameID() {
        return this.gameID;
    }

    public setGameID(gameID) {
        this.gameID = gameID;
    }

    public getDate() {
        return this.date;
    }

    public setDate(date) {
        this.date = date;
    }

    public setGameRoundAmount(gameRoundAmount: number){
        this.gameRoundAmount=gameRoundAmount;
    }

    public getGameRoundAmount(){
        return this.gameRoundAmount;
    }
    
    public getPlayerList(){
        return this.players;
    }
    setPlayerList(players){
        this.players=players
    }
}
 