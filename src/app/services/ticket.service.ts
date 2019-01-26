import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { Pair } from '../models/Pair';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private subject = new Subject<any>();

  addNewPair(selectedPair: Offer, selectedCoefficient: string, selectedType: string, addRemoveFlag: boolean, special: boolean) {
    const newPair = new Pair();
    newPair.offerId = selectedPair.id;
    newPair.pairName = selectedPair.pairName;
    newPair.selectedOptionName = selectedType;
    newPair.selectedCoefficient = selectedCoefficient;
    newPair.special = special;

    this.subject.next({ newPair: newPair, addRemove: addRemoveFlag });
  }

  getNewPair(): Observable<any> {
    return this.subject.asObservable();
  }

}
