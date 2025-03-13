import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import {ProductComponent} from "./components/product/product.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LongTextPipe} from "./pipes/long-text.pipe";
import {PricePipe} from "./pipes/price.pipe";


@NgModule({
  declarations: [
    ProductComponent,

    LongTextPipe,
    PricePipe
  ],
  exports: [
    LongTextPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
