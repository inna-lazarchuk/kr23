import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../services/products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() id: number | undefined;
  private products: ProductType[] = [];
  product: ProductType;
  subscriptionProducts: Subscription | null = null;
  subscriptionParams: Subscription | null = null;

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
    this.subscriptionParams = this.activatedRoute.params
      .subscribe({
        next: (params: Params) => {
          let id = +params['id'];
          this.subscriptionProducts = this.productsService.getProducts()
            .subscribe({
              next: (data) => {
                let productItem = data.find((product) => {
                  return product.id === id;
                })
                if(productItem) {
                  this.product.image = productItem.image;
                  this.product.title = productItem.title;
                  this.product.price = productItem.price
                  this.product.description = productItem.description
                }
              },
              error: (error) => {
                console.log(error)
              }
            })
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  ngOnDestroy() {
    this.subscriptionParams?.unsubscribe();
    this.subscriptionProducts?.unsubscribe();
  }
}
