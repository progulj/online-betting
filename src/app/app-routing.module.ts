import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BettingOfferComponent } from './components/betting-offer/betting-offer.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PlayedTicketsComponent } from './components/played-tickets/played-tickets.component';

const routes: Routes = [
  { path: '', component: BettingOfferComponent },
  { path: 'playedTickets', component: PlayedTicketsComponent },
  { path: 'wallet', component: WalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
