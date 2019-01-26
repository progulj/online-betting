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

  unselectOffer(offerId: number) {
      this.subject.next({id : offerId});
  }

  removeOfferSelection(): Observable<any> {
    return this.subject.asObservable();
  }

  getOffers(): Observable<Offer[]> {
    return of(OFFERS);
  }
}
