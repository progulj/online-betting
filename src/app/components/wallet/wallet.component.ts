import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { IWallet } from '../../interfaces/IWallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  private wallet: IWallet;
  private amount: number;
  private isMinimum: boolean;
  private isMaximum: boolean;

  constructor(private walletService: WalletService) {
    this.wallet = {
      id: null,
      walletBalance: 0,
      account: null,
      date: null,
      amount: null
    };
    this.resetWarnings();
    this.amount = 0;
  }

  ngOnInit() {
    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet = wallet;
      });
    this.walletService.get();
  }

  addFunds(): void {
    this.resetWarnings();
    if (this.amount && this.amount >= 10 && this.amount <= 100) {
      this.wallet.amount = this.amount;
      this.walletService.post(this.wallet);
      this.amount = null;
    } else {
      if (this.amount < 10) {
        this.isMinimum = true;
      } else if (this.amount > 100) {
        this.isMaximum = true;
      }
    }
  }

  resetWarnings() {
    this.isMinimum = false;
    this.isMaximum = false;
  }

}
