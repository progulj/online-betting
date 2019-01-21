import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BettingOfferComponent } from './components/betting-offer/betting-offer.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: BettingOfferComponent },
  { path: 'wallet', component: WalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
