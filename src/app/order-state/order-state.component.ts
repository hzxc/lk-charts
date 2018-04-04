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
  private orders;
  @Input()
  private multiple;

  private fuhe: number;
  private jianhuo: number;
  private orderTotal:number;


  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    var timer;
    timer = setInterval(() => {
      if (this.orders != undefined) {
        this.getState();
        clearInterval(timer);
      }
    }, 1000)
  }
  ngOnDestroy(): void {
    
  }

  getState() {
    let send = 0, number = 0, lengt = 0;
    for (let i in this.orders) {
      length++
    }
    // 已发运
    for (let i in this.orders) {
      if (this.orders[i]['trailingSts'] == '700') {
        send++;
      }
    }
    //订单池
    for (let i in this.orders) {
      if (this.orders[i]['trailingSts'] == '300') {
        number++;
      }
    }
    this.fuhe = send * this.multiple;
    this.jianhuo = number * this.multiple;
    this.orderTotal = length * this.multiple;
  }
}
