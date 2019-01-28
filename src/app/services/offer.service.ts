import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Offer } from '../models/Offer';
import { OFFERS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) {
    this.offerUrl = 'http://localhost:3000/api/bettingoffer';
  }
  private offerUrl: string;

  deselectOffer(offerId: number, specialOnly: boolean, type: string) {
      this.subject.next({id : offerId, deselectSpecial : specialOnly, selectionToRevert: type});
  }

  removeOfferSelection(): Observable<any> {
    return this.subject.asObservable();
  }

  getOffers(): Observable<any> {
      return this.httpClient.get(this.offerUrl);
    }
}
