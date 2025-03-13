import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private products: ProductType[] = [];
  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.productsService.getProducts().subscribe(data => {
          this.products = data;
          this.product = this.products.find((item: ProductType) => {
            item.id = +params['id'];
           return item;
          }) as ProductType;
          console.log(this.product)
          //
          // if (productItem) {
          //   this.product.id = productItem.id;
          //   this.product.image = productItem.image;
          //   this.product.title = productItem.title;
          //   this.product.price = productItem.price;
          //   this.product.description = productItem.description;
          // }
        })
      }
    })
  }
}
