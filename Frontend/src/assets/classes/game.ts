import { IPlayer, Player } from './player'
import { IRound, Round } from './round'

export interface IGame {
    gameID?: number,
    date?: string | Date,
    gameRoundAmount?: number,
    players?: IPlayer[],
    gameDetails?: IRound[]
}

export class Game implements IGame {

    static fromJSON(json: IGame) {
        // immutability
        json = {...json}

        if (json.date) {
            json.date = json.date instanceof Date ? json.date : new Date(Date.parse(json.date))
        }
        if (json.players) {
            json.players = json.players.map(player => Player.fromJSON(player))
        }
        if (json.gameDetails) {
            json.gameDetails = json.gameDetails.map(round => Round.fromJSON(round))
        }
        return Object.assign(new Game(), json)
    }

    constructor(public gameID: number = -1, public date: Date = new Date(), 
    public gameRoundAmount: number = 0, public players: Player[] = [], public rounds: Round[] = []) { }


}