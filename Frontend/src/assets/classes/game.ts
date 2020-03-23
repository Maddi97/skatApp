import { Player } from './player'

export interface IGame {
    gameID?: number,
    date?: string | Date,
    gameRoundAmount?: number,
    players?: Number[] | Player[]
}

export class Game implements IGame {

    constructor(readonly gameID: number, readonly date: Date, 
        readonly gameRoundAmount: number, readonly players: Player[] ) { }

}
