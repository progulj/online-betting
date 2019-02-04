import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IOffer, IOfferView } from '../interfaces/IOffer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offers: IOffer[];
  private offerViews: IOfferView[];
  private offerSubject: Subject<any>;
  public offer$: Observable<any>;
  private offersSubject: Subject<IOfferView[]>;
  public offers$: Observable<IOfferView[]>;
  private offerUrl: string;

  constructor(private httpClient: HttpClient) {
    this.offerUrl = 'http://localhost:27255/offers';
    this.offersSubject = new Subject<IOfferView[]>();
    this.offers$ = this.offersSubject.asObservable();
    this.offerSubject = new Subject<any>();
    this.offer$ = this.offerSubject.asObservable();
    this.offerViews = [];

  }


  deselectOffer(offerId: number, specialOnly: boolean, type: string) {
    this.offerSubject.next({ id: offerId, deselectSpecial: specialOnly, selectionToRevert: type });
  }


  getOffers() {
    return this.httpClient.get(this.offerUrl).subscribe(
      successData => {
        this.offers = successData as IOffer[];
        this.offerViews = [];
        this.offers.forEach(offer => {
          const offerView = {
            id: offer.id,
            game: offer.game,
            oddsFor1: offer.oddsFor1,
            oddsForX: offer.oddsForX,
            oddsFor2: offer.oddsFor2,
            oddsForX1: offer.oddsForX1,
            oddsForX2: offer.oddsForX2,
            oddsFor12: offer.oddsFor12,
            special: offer.special,
            specialOddsFor1: offer.specialOddsFor1,
            specialOddsForX: offer.specialOddsForX,
            specialOddsFor2: offer.specialOddsFor2,
            specialOddsForX1: offer.specialOddsForX1,
            specialOddsForX2: offer.specialOddsForX2,
            specialOddsFor12: offer.specialOddsFor12,
            oddsFor1Selected: false,
            oddsForXSelected: false,
            oddsFor2Selected: false,
            oddsForX1Selected: false,
            oddsForX2Selected: false,
            oddsFor12Selected: false,
            specialOddsFor1Selected: false,
            specialOddsForXSelected: false,
            specialOddsFor2Selected: false,
            specialOddsForX1Selected: false,
            specialOddsForX2Selected: false,
            specialOddsFor12Selected: false
          };
          this.offerViews.push(offerView);
        });
        this.offersSubject.next(this.offerViews);
      },
      errData => {
        console.log(`Error while getting betting offers->${errData}`);
      }
    );
  }
}
