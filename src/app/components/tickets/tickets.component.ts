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
  private minimunWager: number;
  private types: Object;
  private isSecondSpecial: boolean;
  private isNothingSelected: boolean;
  private isNegativeBalance: boolean;
  private isSpecialConditionNotMet: boolean;
  private isMinimumWager: boolean;
  private isMaximumWager: boolean;


  constructor(private offerService: OfferService, private ticketService: TicketService, private walletService: WalletService) {

  }

  ngOnInit() {
    this.setTicketToDefaultState();
    this.ticketService.game$.subscribe(
      game => {
        this.addGameToTicket(game);
      });

    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet = wallet;
      });
    this.walletService.get();
    this.types = { 1: '1', 2: 'X', 3: '2', 4: 'X1', 5: 'X2', 6: '12' };
  }


  playTicket(): void {
    this.resetWarnings();
    if (this.ticket.fullPayment < 10) {
      this.isMinimumWager = true;
    } else if (this.ticket.fullPayment < 10) {
      this.isMaximumWager = true;
    } else {
      if (this.ticket.games.length === 0) {
        this.isNothingSelected = true;
      } else {
        const special = this.ticket.games.filter(offer => offer.special === true);
        if (special && special.length > 0) {
          this.createTicektWithSpecialGame(special);
        } else {
          if (+this.ticket.fullPayment > this.wallet.walletBalance) {
            this.isNegativeBalance = true;
          } else {
            this.createNewTicket();
          }
        }
      }
    }
  }

  createTicektWithSpecialGame(special: IGame[]): any {
    let limit = 0;
    this.ticket.games.forEach(game => {
      if (!game.special) {
        if (+game.odds >= 1.1) {
          limit++;
        }
      }
    });
    if (limit >= 5) {
      if (this.ticket.fullPayment > this.wallet.walletBalance) {
        this.isNegativeBalance = true;
      } else {
        this.createNewTicket();
      }
    } else {
      this.isSpecialConditionNotMet = true;
    }
  }

  createNewTicket() {
    this.ticket.idWallet = this.wallet.id;
    this.ticket.date = new Date();
    this.ticket.commission = Math.round(this.ticket.fullPayment * 0.05 * 100) / 100;
    this.ticket.estimatedWin = Math.round(this.ticket.totalOdds * (this.ticket.fullPayment - 0.05 * this.ticket.fullPayment) * 100) / 100;
    this.ticketService.playTicket(this.ticket).subscribe(successData => {
      this.walletService.wallet$.subscribe(
        wallet => {
          this.wallet = wallet;
        });
      this.ticket.games.forEach(gameToDeselect => {
        this.offerService.deselectOffer(gameToDeselect.idOffer, gameToDeselect.special, gameToDeselect.oddsType);
      });
      this.setTicketToDefaultState();
      this.walletService.get();
    }, errData => {
      console.log(`Error while adding new ticket->${errData}`);
    }
    );
  }

  setTicketToDefaultState() {
    this.ticket = {
      totalOdds: 0.00,
      fullPayment: 10.00,
      commission: 0.05,
      estimatedWin: 0,
      games: [],
      date: null,
      idWallet: null
    };
    this.wallet = {
      id: null,
      walletBalance: 0,
      account: null,
      date: null,
      amount: null
    };
    this.resetWarnings();
  }

  addGameToTicket(newGame: IGame) {
    this.resetWarnings();
    if (this.ticket.games) {
      this.game = this.ticket.games.find(game => game.idOffer === newGame.idOffer);
      if (this.game) {
        if (newGame.isAddOrEdit) {
          this.editGameOnTicket(newGame);
        } else {
          this.ticket.games = this.ticket.games.filter(game => game.idOffer !== this.game.idOffer);
          this.recalculateTotalOdds();
        }
      } else {
        this.pushNewGameToTicket(newGame);
      }
    }
  }

  editGameOnTicket(newGame: IGame): any {
    const specialGames = this.ticket.games.filter(game => game.special === true);
    if (specialGames.length > 0 && newGame.special && newGame.idOffer !== specialGames[0].idOffer) {
      this.isSecondSpecial = true;
      this.offerService.deselectOffer(newGame.idOffer, true, this.game.oddsType);
    } else {
      this.ticket.games = this.ticket.games.filter(game => game.idOffer !== this.game.idOffer);
      newGame.date = this.game.date;
      this.ticket.games.push(newGame);
      this.sortByDate();
      this.recalculateTotalOdds();
    }
  }

  pushNewGameToTicket(newGame: IGame): any {
    const specialOffers = this.ticket.games.filter(offer => offer.special === true);
    if (specialOffers.length > 0 && newGame.special) {
      this.isSecondSpecial = true;
      this.offerService.deselectOffer(newGame.idOffer, true, '-');
    } else {
      newGame.date = new Date();
      this.ticket.games.push(newGame);
      this.recalculateTotalOdds();
    }
  }


  recalculateTotalOdds() {
    this.ticket.totalOdds = 0.0;
    this.ticket.games.forEach(game => {
      this.ticket.totalOdds += +game.odds;
    }
    );
    this.ticket.totalOdds = Math.round(this.ticket.totalOdds * 100) / 100;

  }

  deleteThisPair(gameToDelete: IGame) {
    this.removePair(gameToDelete);
    this.offerService.deselectOffer(gameToDelete.idOffer, false, '-');
    this.resetWarnings();
  }

  removePair = (gameToDelete: IGame): void => {
    this.ticket.games = this.ticket.games.filter(pair => pair.idOffer !== gameToDelete.idOffer);
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
    this.isMinimumWager = false;
    this.isMaximumWager = false;
  }

  sortByDate(): void {
    this.ticket.games.sort((n1, n2) => {
      if (n1.date.getTime() > n2.date.getTime()) {
        return 1;
      }
      if (n1.date.getTime() < n2.date.getTime()) {
        return -1;
      }
      return 0;
    });
  }
}
