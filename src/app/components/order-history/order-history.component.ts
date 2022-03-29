import { OrderHistoryService } from './../../services/order-history.service';
import { OrderHistory } from './../../model/order-history';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList : OrderHistory[] = [];
  storage : Storage = sessionStorage ;
  name : any ;
  constructor(private orderHistoryService : OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
    
    

  }
  handleOrderHistory() {
    // read the email from browser storage 
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));
    this.name =  JSON.parse(this.storage.getItem('userName'));
    // retreive data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    )
  }

}
