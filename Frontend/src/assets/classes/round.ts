export type Color = "Eichel" | "Grün" | "Rot" | "Schell" | "Grand" | "Null" | "Ramsch"
export const FARBE: Color[] = ["Eichel", "Grün", "Rot", "Schell", "Grand", "Null", "Ramsch"]

export type Unter = "Mit 1" | "Mit 2" | "Mit 3" | "Mit 4" |
                    "Ohne 1" | "Ohne 2" | "Ohne 3" | "Ohne 4" 
export const UNTER: Unter[] = ["Mit 1", "Mit 2", "Mit 3", "Mit 4", "Ohne 1", "Ohne 2", "Ohne 3", "Ohne 4"]

export type Specs = "Hand" | "Schneider" | "schneiderAngesagt" | "Schwarz" | "schwarzAngesagt" | "Ouvert"
export const SPECS: Specs[] = ["Hand", "Schneider", "schneiderAngesagt", "Schwarz", "schwarzAngesagt", "Ouvert"]


export const EMPTY_ROUND:IRound= {
    gameID:null,
    playerID:null, 
    gameRound:0,
    score: 0,
    scoreSum: 0,
    color: null,
    unter: null,
    hand: false,
    schneider: false,
    schwarz: false,
    schneiderAngesagt: false,
    schwarzAngesagt: false,
    ouvert: false,
    bock: false
};                    


export interface IRound {
    gameID?: number,
    playerID?: number, 
    gameRound?: number,
    score?: number,
    scoreSum?: number,
    color?: Color,
    unter?: Unter, 
    hand?: boolean,
    schneider?: boolean,
    schwarz?: boolean,
    schneiderAngesagt?: boolean,
    schwarzAngesagt?: boolean,
    ouvert?: boolean,
    bock?: boolean
}

export class Round implements IRound {

    static fromJSON(json: IRound) {
        return Object.assign(new Round(), json)
    }

    constructor(public gameID?: number, public playerID?: number, public gameRound?: number,
        public score?: number, public scoreSum?: number, public color?: Color,
        public unter?: Unter, public hand?: boolean, public schneider?: boolean,
        public schwarz?: boolean, public schneiderAngesagt?: boolean, public schwarzAngesagt?: boolean,
        public ouvert?: boolean, public bock?: boolean) { }
        
}