export type Color = "Eichel" | "Grün" | "Rot" | "Shell" | "Grand" | "Null" | "Ramsch"
export type Unter = "Mit 1" | "Mit 2" | "Mit 3" | "Mit 4" |
                    "Ohne 1" | "Ohne 2" | "Ohne 3" | "Ohne 4" 

export const SPECS: string[] = ['hand', 'schneider', 'schneiderAngesagt', 'schwarz', 'schwarzAngesagt', 'ouvert']
export const COLUMNS: string[] = ['Unter', 'Farbe', 'Specs', 'Bock', 'Gespielt']
export const FARBE: string[] = ['Eichel', 'Grün', 'Rot', 'Schell', 'Grand', 'Null', 'Ramsch']
export const UNTER: string[] = ['Mit 1', 'Mit 2', 'Mit 3', 'Mit 4', 'Ohne 1', 'Ohne 2', 'Ohne 3', 'Ohne 4']
export const EMPTY_ROUND:IRound={"gameID":null,"playerID":null, "gameRound":null,"score": null,"scoreSum": null,"color":null,"unter":null, "hand":false,"schneider":false,"schwarz":false,
"schneiderAngesagt": false,"schwarzAngesagt":false,"ouvert":false,"bock":false};                    

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

    constructor(private _gameID: number, private _playerID: number, private _gameRound: number,
        private _score: number, private _scoreSum: number, private _color: Color,
        private _unter: Unter, private _hand: boolean, private _schneider: boolean,
        private _schwarz: boolean, private _schneiderAngesagt: boolean, private _schwarzAngesagt: boolean,
        private _ouvert: boolean, private _bock: boolean) { }

        
        get gameID(): number {
            return this._gameID
        }
        set gameID(id: number) {
            this._gameID = id 
        }
        get playerID(): number {
            return this._playerID
        }
        set playerID(id: number) {
            this.playerID = id
        }
        get gameRound(): number {
            return this._gameRound
        }
        set gameRound(round: number) {
            this._gameRound = round
        } 
        get score(): number {
            return this._score
        }
        set score(score: number) {
            this._score = score
        }
        get scoreSum(): number{
            return this._scoreSum
        }
        set scoreSum(sum: number) {
            this._scoreSum = sum
        }
        get color(): Color {
            return this._color
        }
        set color(color: Color) {
            this._color = color
        }
        get unter(): Unter {
            return this._unter
        }
        set unter(unter: Unter) {
            this._unter = unter;
        }
        get hand(): boolean {
            return this._hand
        }
        set hand(hand: boolean) {
            this._hand = hand
        }
        get schneider(): boolean{
            return this._schneider
        }
        set schneider(schneider: boolean) {
            this._schneider = schneider
        }
        get schwarz(): boolean {
            return this._schwarz
        }
        set schwarz(schwarz: boolean) {
            this._schwarz = schwarz
        }
        get schneiderAngesagt(): boolean {
            return this._schneiderAngesagt
        }
        set schneiderAngesagt(schneiderA: boolean) {
            this._schneiderAngesagt = schneiderA
        }
        get schwarzAngesagt(): boolean {
            return this._schwarzAngesagt
        }
        set schwarzAngesagt(schwarzA: boolean) {
            this._schwarzAngesagt = schwarzA
        }
        get ouvert(): boolean {
            return this._ouvert
        }
        set ouvert(ouvert: boolean) {
            this._ouvert = ouvert
        }
        get bock(): boolean {
            return this._bock
        }
        set bock(bock: boolean) {
            this._bock = bock
        }

        
}