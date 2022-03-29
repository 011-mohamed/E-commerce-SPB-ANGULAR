import { CartService } from './../../services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../model/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})

export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService : CartService) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the id param string. convert string to a number using the "+" symbol
    const theProductId : number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data ; 
      }
    )
    
  }

  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    
     const theCartItem = new CartItem(this.product);

     this.cartService.addToCart(theCartItem)


  }

}
