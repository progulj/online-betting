import { IGame } from './IGame';
export interface ITicket {
    totalOdds: number;
    fullPayment: number;
    commission: number;
    estimatedWin: number;
    games: IGame[];
    date: Date;
    idWallet: number;
}
