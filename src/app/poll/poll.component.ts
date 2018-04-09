import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {

  @Input()
  private spinnerDiameter: number;
  @Input()
  private orders;
  @Input()
  private multiple;

  private fayun: number;
  private pool: number;
  private orderTotal: number;

  private timer1;

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
    }, 500)
    this.timer1= setInterval(() => {
        this.getState();
    }, 5000)
  }
  ngOnDestroy(): void {

  }
  getState() {
    let send = 0, number = 0, length= 0;
    for (let i in this.orders) {
      length++
    }
    // 已发运
    for (let i in this.orders) {
      if (this.orders[i]['trailingSts'] == '900') {
        send++;
      }
    }
    //订单池
    for (let i in this.orders) {
      if (this.orders[i]['trailingSts'] == '100') {
        number++;
      }
    }   
    this.fayun = send * this.multiple;
    this.pool = number * this.multiple;
    this.orderTotal = length * this.multiple;
  }
}
