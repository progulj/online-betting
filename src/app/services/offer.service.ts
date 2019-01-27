import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { OFFERS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor() { }
  private subject = new Subject<any>();

  deselectOffer(offerId: number, specialOnly: boolean, type: string) {
      this.subject.next({id : offerId, deselectSpecial : specialOnly, selectionToRevert: type});
  }

  removeOfferSelection(): Observable<any> {
    return this.subject.asObservable();
  }

  getOffers(): Observable<Offer[]> {
    return of(OFFERS);
  }
}
