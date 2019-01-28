import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BettingOfferComponent } from './components/betting-offer/betting-offer.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { TwoDigitDecimalNumberDirective } from './directives/two-digit-decimal-number';
import { MultiplyPipe } from './pipes/multiplyOnFly';
import { EstimatedWinPipe } from './pipes/estimatedWin';
import { PlayedTicketsComponent } from './components/played-tickets/played-tickets.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BettingOfferComponent,
    TicketsComponent,
    WalletComponent,
    TwoDigitDecimalNumberDirective,
    MultiplyPipe,
    EstimatedWinPipe,
    PlayedTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
