import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IOfferView } from '../interfaces/IOffer';
import { IGame } from '../interfaces/IGame';
import { ITicket } from '../interfaces/ITicket';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET, OPTIONS,DELETE'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  tickets: ITicket[];
  game: IGame;
  private ticketSubject: Subject<ITicket>;
  public ticket$: Observable<ITicket>;
  private ticketsSubject: Subject<ITicket[]>;
  public tickets$: Observable<ITicket[]>;
  private ticketUrl: string;
  private gameSubject: Subject<IGame>;
  public game$: Observable<IGame>;

  constructor(
    private httpClient: HttpClient) {
    this.ticketUrl = 'http://localhost:3000/tickets';
    this.ticketsSubject = new Subject<ITicket[]>();
    this.tickets$ = this.ticketsSubject.asObservable();
    this.ticketSubject = new Subject<ITicket>();
    this.ticket$ = this.ticketSubject.asObservable();
    this.gameSubject = new Subject<IGame>();
    this.game$ = this.gameSubject.asObservable();
  }


  playTicket(ticket: ITicket): Observable<any> {
    return this.httpClient.post(this.ticketUrl, ticket, httpOptions);
  }

  addGame(offer: IOfferView, selectedOdds: string, selectedType: string, isAddOrEdit: boolean, special: boolean) {
    this.game = {
      offerId: offer.id,
      oddsType: selectedType,
      game: offer.game,
      odds: selectedOdds,
      isAddOrEdit: isAddOrEdit,
      special: special,
      date: null
    };
    this.gameSubject.next(this.game);
  }

  getTickets() {
    return this.httpClient.get(this.ticketUrl).subscribe(
      successData => {
        this.tickets = successData as ITicket[];
        this.ticketsSubject.next(this.tickets);
      },
      errData => {
        console.log(`Error while getting tickets->${errData}`);
      }
    );
  }
}
