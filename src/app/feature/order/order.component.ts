import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public formValues = this.fb.group({
    productTitle: ['', []],
    name: ['', [Validators.required, Validators.pattern('^[a-zа-яА-ЯA-ZЁё]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zа-яА-ЯA-ZЁё]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+[0-9]{11}$')]],
    country: ['', [Validators.required, Validators.pattern('^[a-zа-яА-ЯA-ZЁё]+$')]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    address: ['', [Validators.required, Validators.pattern('^(?!\\s*$)[-\\/\'"№., 0-9а-яА-ЯёЁa-zA-Z]+$')]],
    comment: ['', []]
  })
  private subscriptionOrder: Subscription | null = null;
  public orderSuccess: boolean = false;
  public orderNotSuccess: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.subscriptionOrder = this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params['product']) {
          console.log(params['product'])
          this.formValues.patchValue({
            productTitle: params['product']
          });
        }
      })
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {
    const titleInputValue: string | null = this.formValues.get('productTitle')?.value as string;
    const nameInputValue: string | null = this.formValues.get('name')?.value as string;
    const lastNameInputValue: string | null = this.formValues.get('lastName')?.value as string;
    const phoneInputValue: number | null = parseInt(this.formValues.get('phone')?.value as string);
    const countryInputValue: string | null = this.formValues.get('country')?.value as string;
    const zipInputValue: number | null = parseInt(this.formValues.get('zip')?.value as string);
    const addressInputValue: string | null = this.formValues.get('address')?.value as string;
    const commentInputValue: string | null = this.formValues.get('comment')?.value as string;

    if (titleInputValue && nameInputValue &&
      lastNameInputValue && phoneInputValue && addressInputValue) {
      let data = {
        name: nameInputValue,
        last_name: lastNameInputValue,
        phone: phoneInputValue,
        country: countryInputValue,
        zip: zipInputValue,
        product: titleInputValue,
        address: addressInputValue,
        comment: commentInputValue
      }
      this.http.post<{ success: boolean, message?: string }>('https://testologia.ru/order-tea', data)
        .subscribe(response => {
          if (response.success) {
            this.orderSuccess = true;
          } else {
            this.orderNotSuccess = true;
          }
        })
    } else {
      alert('Заполните форму полностью')
    }


  }

}
