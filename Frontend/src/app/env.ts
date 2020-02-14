
export const SPECS: string[] = ['Hand', 'Schneider', 'Schneider angesagt', 'Schwarz', 'Schwarz angesagt', 'Ouvert']
export const COLUMNS: string[] = ['Unter', 'Farbe', 'Specs', 'Bock', 'Gespielt']
export const FARBE: string[] = ['Eichel', 'Grün', 'Rot', 'Schell', 'Grand', 'Null', 'Ramsch']
export const UNTER: string[] = ['Mit 1', 'Mit 2', 'Mit 3', 'Mit 4', 'Ohne 1', 'Ohne 2', 'Ohne 3', 'Ohne 4']

export interface data_row {
    No: number, Unter: string, Farbe: string, Specs: string[], Bock: Boolean, Gespielt: string
}


export const INITIAL_DATA_ROW: data_row = {No: 0, Unter: '', Farbe: '', Specs:[], Bock: false, Gespielt: ''}
