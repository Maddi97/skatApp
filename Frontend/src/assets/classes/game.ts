import { IPlayer } from './player'

export interface IGame {
    gameID?: number,
    date?: Date,
    gameRoundAmount?: number,
    players?: IPlayer[]
}

export class Game implements IGame {

    constructor(private _gameID: number = -1, private _date: Date = new Date(), 
        private _gameRoundAmount: number = 0, private _players: IPlayer[] = []) { }
    
    get gameID(): number {
        return this._gameID
    }

    set gameID(gameID: number) {
        this._gameID = gameID
    }

    get date(): Date {
        return this._date
    }

    set date(date: Date) {
        this._date = date
    }

    get gameRoundAmount(): number {
        return this._gameRoundAmount
    }

    set gameRoundAmount(amount: number) {
        this._gameRoundAmount = amount
    }

    get players(): IPlayer[] {
        return this._players
    }

    set players(players: IPlayer[]) {
        this._players = players
    }

}