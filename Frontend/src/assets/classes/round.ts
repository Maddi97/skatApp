export type Color = "Eichel" | "Grün" | "Rot" | "Shell" | "Grand" | "Null" | "Ramsch"
export type Unter = "Mit 1" | "Mit 2" | "Mit 3" | "Mit 4" |
                    "Ohne 1" | "Ohne 2" | "Ohne 3" | "Ohne 4" 

export interface IRound {
    gameID: number,
    playerID: number, 
    gameRound: number,
    score: number,
    scoreSum: number,
    color: Color,
    unter: Unter, 
    hand: boolean,
    schneider: boolean,
    schwarz: boolean,
    schneiderAngesagt: boolean,
    schwarzAngesagt: boolean,
    ouvert: boolean,
    bock: boolean
}

export class Round implements IRound {

    constructor(readonly gameID: number, readonly playerID: number, readonly gameRound: number,
        readonly score: number, readonly scoreSum: number, readonly color: Color,
        readonly unter: Unter, readonly hand: boolean, readonly schneider: boolean,
        readonly schwarz: boolean, readonly schneiderAngesagt: boolean, readonly schwarzAngesagt: boolean,
        readonly ouvert: boolean, readonly bock: boolean) { }

}