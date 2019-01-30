import { IGame } from './IGame';
export interface ITicket {
    id: number;
    totalOdds: number;
    fullPayment: number;
    commission: number;
    estimatedWin: number;
    games: IGame[];
    date: number;
}
