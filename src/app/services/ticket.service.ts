import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { Pair } from '../models/Pair';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})

export class PairService {

  private subjects = new Subject<any>();
  private pairs: Pair [];

  constructor() {
    this.pairs = [];
  }

  addNewPair(selectedPair: Offer, selectedCoefficient: string, selectedType: string, addRemoveFlag: boolean, special: boolean) {
    const newPair = new Pair();
    newPair.offerId = selectedPair.id;
    newPair.pairName = selectedPair.pairName;
    newPair.selectedOptionName = selectedType;
    newPair.selectedCoefficient = selectedCoefficient;
    newPair.special = special;

    this.subjects.next({ newPair: newPair, addRemove: addRemoveFlag });
    this.pairs.push(newPair);
  }

  getNewPair(): Observable<any> {
    return this.subjects.asObservable();
  }

  getPairs(): Observable<Pair[]> {
    return of(this.pairs);
  }

}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  tickets: Ticket [];
  constructor() {
    this.tickets = [];
  }

  playTicket(ticket: Ticket): any {
      this.tickets.push(ticket);
  }

  getTickets(): Ticket [] {
    return this.tickets;
  }
}
