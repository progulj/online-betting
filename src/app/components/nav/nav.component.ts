import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  subscription: Subscription;
  wallet: any;

  constructor(private walletService: WalletService) {
  }
  ngOnInit() {
    this.walletService.wallet$.subscribe(
      wallet => {
        this.wallet.walletBalance = wallet.walletBalance;
      });
      this.walletService.get();
  }


}
