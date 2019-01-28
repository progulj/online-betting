import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ticket } from '../../models/Ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-played-tickets',
  templateUrl: './played-tickets.component.html',
  styleUrls: ['./played-tickets.component.scss']
})
export class PlayedTicketsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private tickets: Ticket [];

  constructor( private ticketService: TicketService) {
  }

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }

  ngOnDestroy() {
  }

}
