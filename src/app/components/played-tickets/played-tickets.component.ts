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
  private types: Object;

  constructor(private ticketService: TicketService) {
    this.tickets = [];
    this.types = {1: '1', 2: 'X', 3 : '2', 4 : 'X1', 5 : 'X2', 6 : '12'};
  }

  ngOnInit() {
    this.ticketService.tickets$.subscribe(
      tickets => {
        this.tickets = tickets;
      });
    this.ticketService.getTickets();
  }

}
