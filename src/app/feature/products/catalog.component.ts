import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product.type";
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: ProductType[] = [];
  constructor(private http: HttpClient,
              private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((data: ProductType[]) => {
        this.products = data;
        console.log(this.products)
      })
  }

}
