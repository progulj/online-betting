import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/Wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements  OnInit, OnDestroy {
  subscription: Subscription;
  private amount: number;
  private walletBalance: number;
  private wallet: Wallet;

  constructor(private walletService: WalletService) {
  }
  ngOnInit() {
    this.subscription = this.walletService.returnWalletFunds().subscribe(
      data => this.walletBalance = data.walletBalance );
    this.wallet = new Wallet();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addFunds(): void {
    this.wallet.walletBalance = this.walletBalance + +this.amount;
    this.walletService.addFundsToWallet(this.wallet)
    .subscribe(data => {
      this.walletBalance += this.amount;
    });
  }

}
