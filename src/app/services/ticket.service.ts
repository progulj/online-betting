import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { Pair } from '../models/Pair';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private subject = new Subject<any>();

  addNewPair(selectedPair: Offer, selectedType: string, selectedCoefficient: string) {
      const newPair = new Pair();
      newPair.id = selectedPair.id;
      newPair.pairName = selectedPair.pairName;
      newPair.selectedOptionName = selectedType;
      newPair.selectedCoefficient = selectedCoefficient;

      this.subject.next(newPair);
  }

  getPairs(): Observable<any> {
    return this.subject.asObservable();
  }

}
