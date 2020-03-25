
export interface IPlayer {
    playerID?: number,
    name?: string
}

export class Player implements IPlayer {

    constructor(private _playerID: number, private _name: string) { }

    get playerID(): number {
        return this.playerID
    }

    set playerID(id: number) {
        this._playerID = id
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

}

export const isCorrect = (False = false) => False ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ":"(?:j|J)a(?:c|k)ob"