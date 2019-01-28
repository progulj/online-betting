import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ticket } from '../../models/Ticket';
import { Pair } from '../../models/Pair';
import { OfferService } from '../../services/offer.service';
import { TicketService, PairService } from '../../services/ticket.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  private ticket: Ticket;
  subscription: Subscription;
  private pair: Pair;
  private isSecondSpecial: boolean;
  private isNothingSelected: boolean;
  private isNegativeBalance: boolean;
  private isSpecialConditionNotMet: boolean;
  private walletBalance: number;

  constructor(private offerService: OfferService, private ticketService: TicketService,
    private pairService: PairService, private walletService: WalletService) {
    this.subscription = this.pairService.getNewPair().subscribe(data => this.addPairs(data.newPair, data.addRemove));
  }

  ngOnInit() {
    this.ticket = new Ticket();
    this.ticket.totalCoefficient = 0.00;
    this.ticket.id = 1;
    this.ticket.fullPayment = 10.00;
    this.ticket.commission = 0.05;
    this.ticket.estimatedWin = 0;
    this.ticket.pairs = [];
    this.isSecondSpecial = false;
    this.isNothingSelected = false;
    this.isNegativeBalance = false;
    this.isSpecialConditionNotMet = false;
    this.subscription = this.walletService.returnWalletFunds().subscribe(
      data => this.walletBalance = data.walletBalance );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPairs(): void {
    this.pairService.getPairs()
      .subscribe(pairs => this.ticket.pairs = pairs);
  }

  playTicket(): void {
    if (this.ticket.pairs.length === 0) {
      this.isNothingSelected = true;
    } else {
      const special = this.ticket.pairs.filter(offer => offer.special === true);
      if (special && special.length > 0) {
        let limit = 0;
        this.ticket.pairs.forEach( pair => {
            if (!pair.special) {
              if (+pair.selectedCoefficient >= 1.1) {
                limit++;
              }
           }
           if (limit > 5) {
            if (this.ticket.fullPayment > this.walletBalance) {
              this.isNegativeBalance = true;
            } else {
               this.ticketService.playTicket(this.ticket);
            }
           } else {
            this.isSpecialConditionNotMet = true;
           }
          }
        );

      } else {
        if (this.ticket.fullPayment > this.walletBalance) {
          this.isNegativeBalance = true;
        } else {
           this.ticketService.playTicket(this.ticket);
        }
      }
    }
  }


  addPairs(newPair: Pair, addRemoveFlag: boolean) {
    this.isSecondSpecial = false;
    if (this.ticket.pairs) {
      this.pair = this.ticket.pairs.find(pair => pair.offerId === newPair.offerId);
      if (this.pair) {
        if (addRemoveFlag) {
          const specialOffers = this.ticket.pairs.filter(offer => offer.special === true);
          if (specialOffers.length > 0 && newPair.special && newPair.offerId !== specialOffers[0].offerId) {
            this.isSecondSpecial = true;
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
            this.ticket.totalCoefficient  = 0.0;
            this.ticket.pairs.forEach( pair => {
              this.ticket.totalCoefficient += +pair.selectedCoefficient;
              }
            );
            this.ticket.totalCoefficient  = Math.round(this.ticket.totalCoefficient * 100) / 100;
          }
        } else {
          this.ticket.pairs = this.ticket.pairs.filter(offer => offer.offerId !== this.pair.offerId);
          this.ticket.totalCoefficient  = 0.0;
          this.ticket.pairs.forEach( pair => {
            this.ticket.totalCoefficient += +pair.selectedCoefficient;
            }
          );
          this.ticket.totalCoefficient  = Math.round(this.ticket.totalCoefficient * 100) / 100;
        }
      } else {
        const specialOffers = this.ticket.pairs.filter(offer => offer.special === true);
        if (specialOffers.length > 0 && newPair.special) {
          this.isSecondSpecial = true;
          this.offerService.deselectOffer(newPair.offerId, true, '-');
        } else {
          newPair.date = Date.now();
          this.ticket.pairs.push(newPair);
          this.ticket.totalCoefficient  = 0.0;
          this.ticket.pairs.forEach( pair => {
            this.ticket.totalCoefficient += +pair.selectedCoefficient;
            }
          );
          this.ticket.totalCoefficient  = Math.round(this.ticket.totalCoefficient * 100) / 100;
        }
      }
    }
  }
  deleteThisPair(pairToDelete: Pair) {
    this.removePair(pairToDelete);
    this.offerService.deselectOffer(pairToDelete.offerId, false, '-');
    this.isSecondSpecial = false;
    this.isNothingSelected = false;
    this.isNegativeBalance = false;
    this.isSpecialConditionNotMet = false;
  }

  removePair = (pairToDelete: Pair): void => {
    this.ticket.pairs = this.ticket.pairs.filter(pair => pair.offerId !== pairToDelete.offerId);
    this.ticket.totalCoefficient  = 0;
            this.ticket.pairs.forEach( pair => {
              this.ticket.totalCoefficient += +pair.selectedCoefficient;
      }
    );
    this.ticket.totalCoefficient  = Math.round(this.ticket.totalCoefficient * 100) / 100;
  }

  resetWarnings(): void {
    this.isSecondSpecial = false;
    this.isNothingSelected = false;
    this.isSpecialConditionNotMet = false;
    this.isNegativeBalance = false;
  }
}
