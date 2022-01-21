import { ProductCategory } from './../../model/product-category';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[]; 
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
        data => {
          console.log('Product Categories=' + JSON.stringify(data));
          this.productCategories = data ;
        }
    );
  }

}
