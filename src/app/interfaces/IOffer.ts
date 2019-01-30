export interface IOffer {
    id: number;
    game: string;
    oddsFor1: string;
    oddsForX: string;
    oddsFor2: string;
    oddsForX1: string;
    oddsForX2: string;
    oddsFor12: string;
    specialOddsFor1: string;
    specialOddsForX: string;
    specialOddsFor2: string;
    specialOddsForX1: string;
    specialOddsForX2: string;
    specialOddsFor12: string;
    special: boolean;
}

export interface IOfferView extends IOffer {

    oddsFor1Selected: boolean;
    oddsForXSelected: boolean;
    oddsFor2Selected: boolean;
    oddsForX1Selected: boolean;
    oddsForX2Selected: boolean;
    oddsFor12Selected: boolean;
    specialOddsFor1Selected: boolean;
    specialOddsForXSelected: boolean;
    specialOddsFor2Selected: boolean;
    specialOddsForX1Selected: boolean;
    specialOddsForX2Selected: boolean;
    specialOddsFor12Selected: boolean;
}
