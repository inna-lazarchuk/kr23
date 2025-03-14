import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import {ProductComponent} from "./components/product/product.component";
import {LongTextPipe} from "./pipes/long-text.pipe";
import {PricePipe} from "./pipes/price.pipe";
import { ProductCardComponent } from './components/product-card/product-card.component';
import {FooterComponent} from "./components/footer/footer.component";


@NgModule({
  declarations: [
    ProductComponent,
    LongTextPipe,
    PricePipe,
    ProductCardComponent,
    FooterComponent
  ],
  exports: [
    ProductComponent,
    LongTextPipe,
    PricePipe,
    ProductCardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
