import { Component, OnInit } from '@angular/core';
import { ITicket } from '../../interfaces/ITicket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-played-tickets',
  templateUrl: './played-tickets.component.html',
  styleUrls: ['./played-tickets.component.scss']
})
export class PlayedTicketsComponent implements OnInit {
  private tickets: ITicket[];

  constructor(private ticketService: TicketService) {
    this.tickets = [];
  }

  ngOnInit() {
    this.ticketService.tickets$.subscribe(
      tickets => {
        this.tickets = tickets;
      });
    this.ticketService.getTickets();
  }

}
