import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Ticket } from '../../models/Ticket';
import { Pair } from '../../models/Pair';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  private ticket: Ticket;
  subscription: Subscription;
  pair: Pair;

  constructor(private offerService: OfferService, private ticketService: TicketService) {
    this.subscription = this.ticketService.getPairs().subscribe(data => this.addPairs(data.newPair, data.addRemove));
  }

  ngOnInit() {
    this.ticket = new Ticket();
    this.ticket.fullPayment = '0';
    this.ticket.commission = '0';
    this.ticket.estimatedWin = '0';
    this.ticket.pairs = [];
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  addPairs(newPair: Pair, addRemoveFlag: boolean) {
    if (this.ticket.pairs) {
      this.pair =  this.ticket.pairs.find(pair =>  pair.offerId === newPair.offerId);
      if (this.pair) {
        if (addRemoveFlag) {
          this.ticket.pairs = this.ticket.pairs.filter(offer => offer.id !== this.pair.id);
          newPair.id = this.pair.id;
          this.ticket.pairs.push(newPair);
          this.ticket.pairs.sort((n1, n2) => {
            if (n1.id > n2.id) {
                return 1;
            }
            if (n1.id < n2.id) {
                return -1;
            }
            return 0;
          });
        } else {
          this.ticket.pairs = this.ticket.pairs.filter(offer => offer.id !== this.pair.id);
        }
      } else {
        newPair.id = this.ticket.pairs.length + 1;
        this.ticket.pairs.push(newPair);
      }
    }
  }
  deleteThisPair(pairToDelete: Pair) {
    this.removePair(pairToDelete);
    this.offerService.unselectOffer(pairToDelete.offerId);
  }

  removePair = (pairToDelete: Pair): void => {
    this.ticket.pairs = this.ticket.pairs.filter(pair => pair.id !== pairToDelete.id);
  }

}
