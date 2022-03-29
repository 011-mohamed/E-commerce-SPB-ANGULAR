import { Observable } from 'rxjs';
import { Purchase } from './../model/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';


  constructor(private htttpClient : HttpClient) { }

  placeOrder(purchase : Purchase): Observable<any>{
    return this.htttpClient.post<Purchase>(this.purchaseUrl , purchase);
  }
}
