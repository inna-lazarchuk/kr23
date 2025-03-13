import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.scss',
  ]
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;
  public popupOnView: boolean = false;

  constructor() {
    this.observable = new Observable((observer) => {
      const timeOut = setTimeout(() => {
        observer.next(this.popupOnView = true)
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeOut)
        }
      }
    });


  }

  ngOnInit(): void {
    $("#accordion").accordion({
      collapsible: true,
      heightStyle: 'content',
    });

    this.subscription = this.observable.subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
