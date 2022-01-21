import { Product } from './../../model/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component .html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber : number = 1 ;
  thePageSize: number = 10 ;
  theTotalElement : number = 0 ; 


  constructor(private productService : ProductService,
              private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }

  listProducts(){

      this.searchMode = this.route.snapshot.paramMap.has('keyword');

      if(this.searchMode){
        this.handleSearchProducts();
      }else{
        this.handleListProducts();
      }
      
  }
  handleSearchProducts() {
    const theKeyword :  string = this.route.snapshot.paramMap.get('keyword');

    // now search for the products using key 
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data ;
      }
    );

  }

  handleListProducts(){
    // check if "id" parameter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategoryId){
      //get the "id" param string. convert string to a number using the "+" symbol 
      this.currentCategoryId= +this.route.snapshot.paramMap.get('id');
    }else{
      // default category id 1
      this.currentCategoryId=1;
    }

    //
    // check if we have  a different category than previous 
    //if we have a different category id than the previous 
    // then set thePAge number back to 1 

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1 ;
    }
    this.previousCategoryId = this.currentCategoryId;
    
    console.log(`currentCategoryId = ${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    
    

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                               this.thePageSize,
                                               this.currentCategoryId )
                                               .subscribe(this.processResult);
  }

  processResult(){
    return data => {

      // right : data from Spring Data REST JSON 
      // left : properties defined in this class
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1 ;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    }
  }

}

