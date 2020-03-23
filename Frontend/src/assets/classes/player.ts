export interface IPlayer {
    playerID?: number,
    name?: string
}

export class Player implements IPlayer {

    constructor(readonly playerID: number, readonly name: string) { }

}