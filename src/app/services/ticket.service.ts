import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { Pair } from '../models/Pair';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private subject = new Subject<any>();

  addNewPair(selectedPair: Offer, selectedType: string, selectedCoefficient: string,  addRemoveFlag: boolean) {
      const newPair = new Pair();
      newPair.offerId = selectedPair.id;
      newPair.pairName = selectedPair.pairName;
      newPair.selectedOptionName = selectedType;
      newPair.selectedCoefficient = selectedCoefficient;

      this.subject.next({newPair: newPair, addRemove: addRemoveFlag});
  }

  getPairs(): Observable<any> {
    return this.subject.asObservable();
  }

}
