import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Offer } from '../models/Offer';
import { OFFERS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor() { }

  getOffers(): Observable<Offer[]> {
    return of(OFFERS);
  }
}
