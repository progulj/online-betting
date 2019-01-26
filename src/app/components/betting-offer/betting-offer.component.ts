import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Offer } from '../../models/Offer';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-betting-offer',
  templateUrl: './betting-offer.component.html',
  styleUrls: ['./betting-offer.component.scss']
})
export class BettingOfferComponent implements OnInit, OnDestroy {
  offers: Offer [];
  subscription: Subscription;
  offerToUnselect: Offer;
  constructor(private offerService: OfferService, private ticketService: TicketService) {
    this.subscription = this.offerService.removeOfferSelection().subscribe(offer => {
      this.unselectOffer(offer.id);
    });
  }

  ngOnInit() {
    this.getOffers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

  unselectOffer(id: number) {
    this.offerToUnselect =  this.offers.find(offer =>  offer.id === id);
    this.offerToUnselect.option1Selected = false;
    this.offerToUnselect.optionXSelected = false;
    this.offerToUnselect.option2Selected = false;
    this.offerToUnselect.optionX1Selected = false;
    this.offerToUnselect.optionX2Selected = false;
    this.offers = this.offers.filter(offer => offer.id !== id);
    this.offers.push(this.offerToUnselect);
    this.offers.sort((n1, n2) => {
      if (n1.id > n2.id) {
          return 1;
      }
      if (n1.id < n2.id) {
          return -1;
      }
      return 0;
    });
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
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option1, '1', selectedOffer.option1Selected);
    }
  }

  selectClickX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      selectedOffer.optionXSelected = !selectedOffer.optionXSelected;
      selectedOffer.option1Selected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX, 'X', selectedOffer.optionXSelected);
    }
  }

  selectClick2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      selectedOffer.option2Selected = !selectedOffer.option2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option2, '2', selectedOffer.option2Selected);
    }
  }

  selectClickX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      selectedOffer.optionX1Selected = !selectedOffer.optionX1Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX1, 'X1', selectedOffer.optionX1Selected);
    }
  }

  selectClickX2(selectedOffer: Offer): void {
    if (selectedOffer.optionX2 !== '-') {
      selectedOffer.optionX2Selected = !selectedOffer.optionX2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX2, 'X2', selectedOffer.optionX2Selected);
    }
  }

  selectSpecialOffer1(selectedOffer: Offer): void {
    if (selectedOffer.option1 !== '-') {
      selectedOffer.option1Selected = !selectedOffer.option1Selected;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option1, '1', selectedOffer.option1Selected);
    }
  }

  selectSpecialOfferX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      selectedOffer.optionXSelected = !selectedOffer.optionXSelected;
      selectedOffer.option1Selected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX, 'X', selectedOffer.optionXSelected);
    }
  }

  selectSpecialOffer2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      selectedOffer.option2Selected = !selectedOffer.option2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.optionX1Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option2, '2', selectedOffer.option2Selected);
    }
  }

  selectSpecialOfferX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      selectedOffer.optionX1Selected = !selectedOffer.optionX1Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX2Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX1, 'X1', selectedOffer.optionX1Selected);
    }
  }

  selectSpecialOfferX2(selectedOffer: Offer): void {
    if (selectedOffer.optionX2 !== '-') {
      selectedOffer.optionX2Selected = !selectedOffer.optionX2Selected;
      selectedOffer.option1Selected = false;
      selectedOffer.optionXSelected = false;
      selectedOffer.option2Selected = false;
      selectedOffer.optionX1Selected = false;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX2, 'X2', selectedOffer.optionX2Selected);
    }
  }
}
