import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { timer } from 'd3';

@Component({
  selector: 'app-order-state',
  templateUrl: './order-state.component.html',
  styleUrls: ['./order-state.component.css']
})
export class orderStateComponent implements OnInit, OnDestroy {


  @Input()
  private spinnerDiameter: number;
  @Input()
  private orderTotal: number;
  @Input()
  private multiple;

  private fuhe: number;
  private jianhuo: number;
  private timer;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getState();
    this.timer = setInterval(() => {
      this.getState();
    }, 1000 * 60 * 30)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getState() {
    // 待复核
    this._OrderServesService
      .getOrders('', 0, 700, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.fuhe = length * this.multiple;
      })
    // 待拣货
    this._OrderServesService
      .getOrders('', 0, 300, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.jianhuo = length * this.multiple;
      })
  }
}
