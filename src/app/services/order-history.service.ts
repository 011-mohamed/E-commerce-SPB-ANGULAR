import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '../model/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl ="http://localhost:8080/api/orders";

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail:string):Observable<GetResponseOrderHistory>{

    // need to build base on customer email
    const orderHistoryUrl =`${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }


}

interface GetResponseOrderHistory {
  _embedded:{
    orders: OrderHistory[];
  }
}