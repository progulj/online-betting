import { Component, OnInit } from '@angular/core';

import { ITicket } from '../../interfaces/ITicket';
import { IGame } from '../../interfaces/IGame';
import { IWallet } from '../../interfaces/IWallet';
import { OfferService } from '../../services/offer.service';
import { TicketService } from '../../services/ticket.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  private ticket: ITicket;
  private game: IGame;
  private wallet: IWallet;
  private isSecondSpecial: boolean;
  private isNothingSelected: boolean;
  private isNegativeBalance: boolean;
  private isSpecialConditionNotMet: boolean;


  constructor(private offerService: OfferService, private ticketService: TicketService, private walletService: WalletService) {

  }

  ngOnInit() {
    this.setTicketToDefaultState();
    this.ticketService.game$.subscribe(
      game => {
        this.addGame(game);
      });

    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet = wallet;
      });
    this.walletService.get();
  }


  playTicket(): void {
    this.resetWarnings();
    if (this.ticket.games.length === 0) {
      this.isNothingSelected = true;
    } else {
      const special = this.ticket.games.filter(offer => offer.special === true);
      if (special && special.length > 0) {
        let limit = 0;
        this.ticket.games.forEach(game => {
          if (!game.special) {
            if (+game.odds >= 1.1) {
              limit++;
            }
          }
          if (limit > 5) {
            if (this.ticket.fullPayment > this.wallet.walletBalance) {
              this.isNegativeBalance = true;
            } else {
              this.ticketService.playTicket(this.ticket).subscribe(successData => {
                this.walletService.get();
                this.ticket.games.forEach(gameToDeselect => {
                  this.offerService.deselectOffer(gameToDeselect.offerId,  gameToDeselect.special, gameToDeselect.oddsType);
                });
                this.setTicketToDefaultState();
              }, errData => {
                console.log(`Error while adding new ticket->${errData}`);
              }
              );
            }
          } else {
            this.isSpecialConditionNotMet = true;
          }
        }
        );

      } else {
        if (this.ticket.fullPayment > this.wallet.walletBalance) {
          this.isNegativeBalance = true;
        } else {
          this.ticketService.playTicket(this.ticket).subscribe(successData => {
            this.walletService.wallet$.subscribe(
              wallet => {
                this.wallet = wallet;
              });
            this.walletService.get();
            this.ticket.games.forEach(gameToDeselect => {
              this.offerService.deselectOffer(gameToDeselect.offerId,  gameToDeselect.special, gameToDeselect.oddsType);
            });
            this.setTicketToDefaultState();
          }, errData => {
            console.log(`Error while adding new ticket->${errData}`);
          }
          );
        }
      }
    }
  }

  setTicketToDefaultState() {
    this.ticket = {
      totalOdds: 0.00,
      id: 1,
      fullPayment: 10.00,
      commission: 0.05,
      estimatedWin: 0,
      games: [],
      date: null
    };
    this.wallet = {
      id: null,
      walletBalance: 0,
    };
    this.isSecondSpecial = false;
    this.isNothingSelected = false;
    this.isNegativeBalance = false;
    this.isSpecialConditionNotMet = false;
  }

  addGame(newGame: IGame) {
    this.resetWarnings();
    if (this.ticket.games) {
      this.game = this.ticket.games.find(game => game.offerId === newGame.offerId);
      if (this.game) {
        if (newGame.isAddOrEdit) {
          const specialGames = this.ticket.games.filter(game => game.special === true);
          if (specialGames.length > 0 && newGame.special && newGame.offerId !== specialGames[0].offerId) {
            this.isSecondSpecial = true;
            this.offerService.deselectOffer(newGame.offerId, true, this.game.oddsType);
          } else {
            this.ticket.games = this.ticket.games.filter(game => game.offerId !== this.game.offerId);
            newGame.date = this.game.date;
            this.ticket.games.push(newGame);
            this.ticket.games.sort((n1, n2) => {
              if (n1.date > n2.date) {
                return 1;
              }
              if (n1.date < n2.date) {
                return -1;
              }
              return 0;
            });
            this.ticket.totalOdds = 0.0;
            this.ticket.games.forEach(game => {
              this.ticket.totalOdds += +game.odds;
            }
            );
            this.ticket.totalOdds = Math.round(this.ticket.totalOdds * 100) / 100;
          }
        } else {
          this.ticket.games = this.ticket.games.filter(game => game.offerId !== this.game.offerId);
          this.ticket.totalOdds = 0.0;
          this.ticket.games.forEach(game => {
            this.ticket.totalOdds += +game.odds;
          }
          );
          this.ticket.totalOdds = Math.round(this.ticket.totalOdds * 100) / 100;
        }
      } else {
        const specialOffers = this.ticket.games.filter(offer => offer.special === true);
        if (specialOffers.length > 0 && newGame.special) {
          this.isSecondSpecial = true;
          this.offerService.deselectOffer(newGame.offerId, true, '-');
        } else {
          newGame.date = Date.now();
          this.ticket.games.push(newGame);
          this.ticket.totalOdds = 0.0;
          this.ticket.games.forEach(game => {
            this.ticket.totalOdds += +game.odds;
          }
          );
          this.ticket.totalOdds = Math.round(this.ticket.totalOdds * 100) / 100;
        }
      }
    }
  }

  deleteThisPair(gameToDelete: IGame) {
    this.removePair(gameToDelete);
    this.offerService.deselectOffer(gameToDelete.offerId, false, '-');
    this.resetWarnings();
  }

  removePair = (gameToDelete: IGame): void => {
    this.ticket.games = this.ticket.games.filter(pair => pair.offerId !== gameToDelete.offerId);
    this.ticket.totalOdds = 0;
    this.ticket.games.forEach(pair => {
      this.ticket.totalOdds += +pair.odds;
    }
    );
    this.ticket.totalOdds = Math.round(this.ticket.totalOdds * 100) / 100;
  }

  resetWarnings(): void {
    this.isSecondSpecial = false;
    this.isNothingSelected = false;
    this.isSpecialConditionNotMet = false;
    this.isNegativeBalance = false;
  }
}
