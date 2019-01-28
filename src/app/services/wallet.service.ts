import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wallet } from '../models/Wallet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET, OPTIONS,DELETE'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private subject = new Subject<any>();
  private walletUrl: string;

  constructor(
    private httpClient: HttpClient) {
    this.walletUrl = 'http://localhost:3000/api/wallet';
  }
  addFundsToWallet (wallet: Wallet): Observable<any> {
    return this.httpClient.post(this.walletUrl, wallet, httpOptions);
  }

  returnWalletFunds():  Observable<any> {
    return this.httpClient.get(this.walletUrl);
  }

}
