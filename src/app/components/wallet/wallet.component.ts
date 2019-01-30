import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { IWallet } from '../../interfaces/IWallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  private amount: number;
  private wallet: IWallet;
  private walletBalance: number;

  constructor(private walletService: WalletService) {
    this.walletBalance = 0;
  }

  ngOnInit() {
    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet = wallet;
        this.walletBalance = wallet.walletBalance;
      });
    this.walletService.get();
  }

  addFunds(): void {
    this.walletBalance = this.walletBalance + +this.amount;
    this.wallet.walletBalance = this.walletBalance;
    this.walletService.post(this.wallet);
  }

}
