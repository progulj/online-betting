import { Component, OnInit } from '@angular/core';
import { IOfferView } from '../../interfaces/IOffer';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-betting-offer',
  templateUrl: './betting-offer.component.html',
  styleUrls: ['./betting-offer.component.scss']
})
export class BettingOfferComponent implements OnInit {
  offers: IOfferView[];
  colums: number;
  offersColspan: number;
  constructor(private offerService: OfferService, private ticketService: TicketService) {
  }

  ngOnInit() {
    this.offers = [];
    this.getOffers();
    this.offerService.offer$.subscribe(
      offer => {
        this.removeOfferSelection(offer.id, offer.deselectSpecial, offer.selectionToRevert);
      });
      this.colums = (window.innerWidth <= 700) ? 1 : 3;
      this.offersColspan = (window.innerWidth <= 700) ? 1 : 2;
  }


  onResize(event) {
    this.colums = (event.target.innerWidth <= 700) ? 1 : 3;
    this.offersColspan = (window.innerWidth <= 700) ? 1 : 2;
  }



  removeOfferSelection(id: number, deselectSpecial: boolean, selectionToRevert: string) {
    const bettingOffer = this.offers.find(offer => offer.id === id);
    if (deselectSpecial) {
      this.deselectSpecialOffer(bettingOffer);
      this.revertSelectionOnBettingOffer(selectionToRevert, bettingOffer);
    } else {
      this.deselectBettingOffer(bettingOffer);
    }
    this.offers = this.offers.filter(offer => offer.id !== id);
    this.offers.push(bettingOffer);
    this.sortById();
  }

  getOffers(): void {
    this.offerService.offers$.subscribe(offers => this.offers = offers);
    this.offerService.getOffers();
  }

  selectBettingOffer1(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsFor1 !== '-') {
      const toggleSelection = !selectedOffer.oddsFor1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsFor1Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsFor1, '1', toggleSelection, false);
    }
  }

  selectBettingOfferX(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsForX !== '-') {
      const toggleSelection = !selectedOffer.oddsForXSelected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsForXSelected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsForX, 'X', toggleSelection, false);
    }
  }

  selectBettingOffer2(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsFor2 !== '-') {
      const toggleSelection = !selectedOffer.oddsFor2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsFor2Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsFor2, '2', toggleSelection, false);
    }
  }

  selectBettingOfferX1(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsForX1 !== '-') {
      const toggleSelection = !selectedOffer.oddsForX1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsForX1Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsForX1, 'X1', toggleSelection, false);
    }
  }

  selectBettingOfferX2(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsForX2 !== '-') {
      const toggleSelection = !selectedOffer.oddsForX2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsForX2Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsForX2, 'X2', toggleSelection, false);
    }
  }

  selectBettingOffer12(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsFor12 !== '-') {
      const toggleSelection = !selectedOffer.oddsFor12Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.oddsFor12Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.oddsFor12, '12', toggleSelection, false);
    }
  }

  selectSpecialOffer1(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsFor1 !== '-') {
      const toggleSelection = !selectedOffer.specialOddsFor1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsFor1Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsFor1, '1', toggleSelection, true);
    }
  }

  selectSpecialOfferX(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsForX !== '-') {
      const toggleSelection = !selectedOffer.specialOddsForXSelected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsForXSelected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsForX, 'X', toggleSelection, true);
    }
  }

  selectSpecialOffer2(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsFor2 !== '-') {
      const toggleSelection = !selectedOffer.specialOddsFor2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsFor2Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsFor2, '2', toggleSelection, true);
    }
  }

  selectSpecialOfferX1(selectedOffer: IOfferView): void {
    if (selectedOffer.oddsForX1 !== '-') {
      const toggleSelection = !selectedOffer.specialOddsForX1Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsForX1Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsForX1, 'X1', toggleSelection, true);
    }
  }

  selectSpecialOfferX2(selectedOffer: IOfferView): void {
    if (selectedOffer.specialOddsForX2 !== '-') {
      const toggleSelection = !selectedOffer.specialOddsForX2Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsForX2Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsForX2, 'X2', toggleSelection, true);
    }
  }

  selectSpecialOffer12(selectedOffer: IOfferView): void {
    if (selectedOffer.specialOddsFor12 !== '-') {
      const toggleSelection = !selectedOffer.specialOddsFor12Selected;
      this.deselectBettingOffer(selectedOffer);
      selectedOffer.specialOddsFor12Selected = toggleSelection;
      this.ticketService.addGame(selectedOffer, selectedOffer.specialOddsFor12, '12', toggleSelection, true);
    }
  }

  deselectBettingOffer(offer: IOfferView) {
    offer.oddsFor1Selected = false;
    offer.oddsForXSelected = false;
    offer.oddsFor2Selected = false;
    offer.oddsForX1Selected = false;
    offer.oddsForX2Selected = false;
    offer.oddsFor12Selected = false;

    this.deselectSpecialOffer(offer);
  }

  deselectSpecialOffer(offer: IOfferView) {
    offer.specialOddsFor1Selected = false;
    offer.specialOddsForXSelected = false;
    offer.specialOddsFor2Selected = false;
    offer.specialOddsForX1Selected = false;
    offer.specialOddsForX2Selected = false;
    offer.specialOddsFor12Selected = false;
  }

  revertSelectionOnBettingOffer(selection: string, offer: IOfferView) {
    if ('X' === selection) {
      offer.oddsForXSelected = true;
    } else if ('X1' === selection) {
      offer.oddsForX1Selected = true;
    } else if ('X2' === selection) {
      offer.oddsForX2Selected = true;
    } else if ('1' === selection) {
      offer.oddsFor1Selected = true;
    } else if ('2' === selection) {
      offer.oddsFor2Selected = true;
    } else if ('12' === selection) {
      offer.oddsFor12Selected = true;
    }
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
