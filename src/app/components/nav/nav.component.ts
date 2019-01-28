import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  walletBalance: number;

  constructor(private walletService: WalletService) {
    this.subscription = this.walletService.returnWalletFunds().subscribe(data => this.walletBalance = data.walletBalance);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
