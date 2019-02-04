import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWallet } from '../interfaces/IWallet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods',
    'Access-Control-Allow-Methods': 'POST,GET, OPTIONS,DELETE'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public wallet: IWallet;
  private walletSubject: Subject<IWallet>;
  public wallet$: Observable<IWallet>;
  private walletUrl: string;

  constructor(
    private httpClient: HttpClient) {
    this.walletUrl = 'http://localhost:27255/wallet';
    this.walletSubject = new Subject<IWallet>();
    this.wallet$ = this.walletSubject.asObservable();
  }

  post(wallet: IWallet): void {
    this.httpClient.post(this.walletUrl, wallet, httpOptions).subscribe(successData => {
      this.wallet = successData as IWallet;
      this.walletSubject.next(this.wallet);
    }, errData => {
      console.log(`Error while updateing wallet balance->${errData}`);
    }
    );
  }


  get() {

    return this.httpClient.get(this.walletUrl, httpOptions).subscribe(
      successData => {
        this.wallet = successData as IWallet;
        this.walletSubject.next(this.wallet);
      },
      errData => {
        console.log(`Error while getting wallet balance->${errData}`);
      }
    );
  }

}

