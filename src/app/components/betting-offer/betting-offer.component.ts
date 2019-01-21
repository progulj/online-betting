import { Component, OnInit } from '@angular/core';

import { Offer } from '../../models/Offer';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-betting-offer',
  templateUrl: './betting-offer.component.html',
  styleUrls: ['./betting-offer.component.scss']
})
export class BettingOfferComponent implements OnInit {
  offers: Offer [];
  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers(): void {
    this.offerService.getOffers()
      .subscribe(offers => this.offers = offers);
  }

  selectClick1(selectedOffer: Offer): void {
    if (selectedOffer.option1 !== '-') {
      selectedOffer.option1Selected = !selectedOffer.option1Selected;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectClickX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      selectedOffer.optionXSelected = !selectedOffer.optionXSelected;
      selectedOffer.option1Selected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectClick2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      selectedOffer.option2Selected = !selectedOffer.option2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectClickX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      selectedOffer.optionX1Selected = !selectedOffer.optionX1Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectClickX2(selectedOffer: Offer): void {
    if (selectedOffer.optionX2 !== '-') {
      selectedOffer.optionX2Selected = !selectedOffer.optionX2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
    }
  }

  selectSpecialOffer1(selectedOffer: Offer): void {
    if (selectedOffer.option1 !== '-') {
      selectedOffer.option1Selected = !selectedOffer.option1Selected;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectSpecialOfferX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      selectedOffer.optionXSelected = !selectedOffer.optionXSelected;
      selectedOffer.option1Selected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectSpecialOffer2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      selectedOffer.option2Selected = !selectedOffer.option2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectSpecialOfferX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      selectedOffer.optionX1Selected = !selectedOffer.optionX1Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX2Selected = false;
    }
  }

  selectSpecialOfferX2(selectedOffer: Offer): void {
    if (selectedOffer.optionX2 !== '-') {
      selectedOffer.optionX2Selected = !selectedOffer.optionX2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
    }
  }
}
