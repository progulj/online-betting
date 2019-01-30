import { Component, OnInit } from '@angular/core';

import { WalletService } from '../../services/wallet.service';
import { IWallet } from '../../interfaces/IWallet';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  walletBalance: number;

  constructor(private walletService: WalletService) {
    this.walletBalance = 0;
  }

  ngOnInit() {
    this.walletService.wallet$.subscribe(
      wallet => {
        this.walletBalance = wallet.walletBalance;
      });
    this.walletService.get();
  }


}
