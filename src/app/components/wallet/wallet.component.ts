import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/Wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements  OnInit {
  private amount: number;
  private wallet: any;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet = wallet;
      });
      this.walletService.get();
  }

  addFunds(): void {
    this.wallet.walletBalance = this.wallet.walletBalance + +this.amount;
    this.walletService.post(this.wallet);
  }

}
