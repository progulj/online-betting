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

  constructor(private offerService: OfferService, private ticketService: TicketService) {
    this.subscription = this.ticketService.getPairs().subscribe(pair => this.ticket.pairs.push(pair));
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

  deleteThisPair(pairToDelete: Pair) {
    this.removePair(pairToDelete);
  }

  removePair = (pairToDelete: Pair): void => {
    this.ticket.pairs = this.ticket.pairs.filter(pair => pair.id !== pairToDelete.id);
  }

}
