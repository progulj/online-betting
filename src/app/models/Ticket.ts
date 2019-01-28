import { Pair } from '../models/Pair';
export class Ticket {
    id: number;
    totalCoefficient: number;
    fullPayment: number;
    commission: number;
    estimatedWin: number;
    pairs: Pair [];
    date: number;
}
