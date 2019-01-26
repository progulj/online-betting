import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Offer } from '../../models/Offer';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-betting-offer',
  templateUrl: './betting-offer.component.html',
  styleUrls: ['./betting-offer.component.scss']
})
export class BettingOfferComponent implements OnInit, OnDestroy {
  offers: Offer[];
  subscription: Subscription;
  constructor(private offerService: OfferService, private ticketService: TicketService) {
    this.subscription = this.offerService.removeOfferSelection().subscribe(offer => {
      this.removeOfferSelection(offer.id);
    });
  }

  ngOnInit() {
    this.getOffers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeOfferSelection(id: number) {
    const bettingOffer = this.offers.find(offer => offer.id === id);
    this.deselectBettingOffer(bettingOffer);
    this.offers = this.offers.filter(offer => offer.id !== id);
    this.offers.push(bettingOffer);
    this.sortById();
  }

  getOffers(): void {
    this.offerService.getOffers()
      .subscribe(offers => this.offers = offers);
  }

  selectBettingOffer1(selectedOffer: Offer): void {
    if (selectedOffer.option1 !== '-') {
      const toggleSelection = !selectedOffer.option1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.option1Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option1, '1', toggleSelection, false);
    }
  }

  selectBettingOfferX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      const toggleSelection = !selectedOffer.optionXSelected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.optionXSelected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX, 'X', toggleSelection, false);
    }
  }

  selectBettingOffer2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      const toggleSelection = !selectedOffer.option2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.option2Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option2, '2', toggleSelection, false);
    }
  }

  selectBettingOfferX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      const toggleSelection = !selectedOffer.optionX1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.optionX1Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX1, 'X1', toggleSelection, false);
    }
  }

  selectBettingOfferX2(selectedOffer: Offer): void {
    if (selectedOffer.optionX2 !== '-') {
      const toggleSelection = !selectedOffer.optionX2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.optionX2Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.optionX2, 'X2', toggleSelection, false);
    }
  }

  selectBettingOffer12(selectedOffer: Offer): void {
    if (selectedOffer.option12 !== '-') {
      const toggleSelection = !selectedOffer.optionX2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.option12Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.option12, '12', toggleSelection, false);
    }
  }

  selectSpecialOffer1(selectedOffer: Offer): void {
    if (selectedOffer.option1 !== '-') {
      const toggleSelection = !selectedOffer.specialOption1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOption1Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOption1, '1', toggleSelection, true);
    }
  }

  selectSpecialOfferX(selectedOffer: Offer): void {
    if (selectedOffer.optionX !== '-') {
      const toggleSelection = !selectedOffer.specialOptionXSelected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOptionXSelected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOptionX, 'X', toggleSelection, true);
    }
  }

  selectSpecialOffer2(selectedOffer: Offer): void {
    if (selectedOffer.option2 !== '-') {
      const toggleSelection = !selectedOffer.specialOption2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOption2Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOption2, '2', toggleSelection, true);
    }
  }

  selectSpecialOfferX1(selectedOffer: Offer): void {
    if (selectedOffer.optionX1 !== '-') {
      const toggleSelection = !selectedOffer.specialOptionX1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOptionX1Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOptionX1, 'X1', toggleSelection, true);
    }
  }

  selectSpecialOfferX2(selectedOffer: Offer): void {
    if (selectedOffer.specialOptionX2 !== '-') {
      const toggleSelection = !selectedOffer.specialOptionX2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOptionX2Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOptionX2, 'X2', toggleSelection, true);
    }
  }

  selectSpecialOffer12(selectedOffer: Offer): void {
    if (selectedOffer.specialOption12 !== '-') {
      const toggleSelection = !selectedOffer.specialOption12Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOption12Selected = toggleSelection;
      this.ticketService.addNewPair(selectedOffer, selectedOffer.specialOption12, '12', toggleSelection, true);
    }
  }

  deselectBettingOffer(offer: Offer) {
    offer.option1Selected = false;
    offer.optionXSelected = false;
    offer.option2Selected = false;
    offer.optionX1Selected = false;
    offer.optionX2Selected = false;
    offer.option12Selected = false;

    this.deselectSpecialOffer(offer);
  }

  deselectSpecialOffer(offer: Offer) {
    offer.specialOption1Selected = false;
    offer.specialOptionXSelected = false;
    offer.specialOption2Selected = false;
    offer.specialOptionX1Selected = false;
    offer.specialOptionX2Selected = false;
    offer.specialOption12Selected = false;
  }

  sortById(): void {
    this.offers.sort((left, right) => {
      if (left.id > right.id) {
        return 1;
      }
      if (left.id < right.id) {
        return -1;
      }
      return 0;
    });
  }
}
