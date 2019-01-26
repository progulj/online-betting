import { Pair } from '../models/Pair';
export class Ticket {
    id: number;
    fullPayment: string;
    commission: string;
    estimatedWin: string;
    pairs: Pair [];
}
