import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ticket } from '../../models/Ticket';
import { Pair } from '../../models/Pair';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  private ticket: Ticket;
  subscription: Subscription;
  pair: Pair;
  isErrorVisible: boolean;

  constructor(private offerService: OfferService, private ticketService: TicketService) {
    this.subscription = this.ticketService.getNewPair().subscribe(data => this.addPairs(data.newPair, data.addRemove));
  }

  ngOnInit() {
    this.ticket = new Ticket();
    this.ticket.fullPayment = '0';
    this.ticket.commission = '0';
    this.ticket.estimatedWin = '0';
    this.ticket.pairs = [];
    this.isErrorVisible = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addPairs(newPair: Pair, addRemoveFlag: boolean) {
    this.isErrorVisible = false;
    if (this.ticket.pairs) {
      this.pair = this.ticket.pairs.find(pair => pair.offerId === newPair.offerId);
      if (this.pair) {
        if (addRemoveFlag) {
          const specialOffers = this.ticket.pairs.filter(offer => offer.special === true);
          if (specialOffers.length > 0 && newPair.special && newPair.offerId !== specialOffers[0].offerId) {
            this.isErrorVisible = true;
            this.offerService.deselectOffer(newPair.offerId, true, this.pair.selectedOptionName);
          } else {
            this.ticket.pairs = this.ticket.pairs.filter(offer => offer.offerId !== this.pair.offerId);
            newPair.date = this.pair.date;
            this.ticket.pairs.push(newPair);
            this.ticket.pairs.sort((n1, n2) => {
              if (n1.date > n2.date) {
                return 1;
              }
              if (n1.date < n2.date) {
                return -1;
              }
              return 0;
            });
          }
        } else {
          this.ticket.pairs = this.ticket.pairs.filter(offer => offer.offerId !== this.pair.offerId);
        }
      } else {
        const specialOffers = this.ticket.pairs.filter(offer => offer.special === true);
        if (specialOffers.length > 0 && newPair.special) {
          this.isErrorVisible = true;
          this.offerService.deselectOffer(newPair.offerId, true, '-');
        } else {
          newPair.date = Date.now();
          this.ticket.pairs.push(newPair);
        }
      }
    }
  }
  deleteThisPair(pairToDelete: Pair) {
    this.removePair(pairToDelete);
    this.offerService.deselectOffer(pairToDelete.offerId, false, '-');
    this.isErrorVisible = false;
  }

  removePair = (pairToDelete: Pair): void => {
    this.ticket.pairs = this.ticket.pairs.filter(pair => pair.offerId !== pairToDelete.offerId);
  }

}
