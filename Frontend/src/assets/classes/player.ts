
export interface IPlayer {
    playerID?: number,
    name?: string
}

export class Player implements IPlayer {

    static fromJSON(json: IPlayer) {
        return Object.assign(new Player(), json)
    }

    constructor(public playerID?: number, public name?: string) { }

}

export const isCorrect = (False = false) => False ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ":"(?:j|J)a(?:c|k)ob"