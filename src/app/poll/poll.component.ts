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
  private orderTotal: number;
  @Input()
  private multiple;

  private fayun: number;
  private pool: number;
  private timer;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getState();
    this.timer=setInterval(()=>{
      this.getState();
    },1000*60*30)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  getState() {
    var yestoday=this._OrderServesService.formatTime(new Date());
    // 已发运
    this._OrderServesService
      .getOrders('', 0, 900, "", "", " ", "", "", "", "", yestoday, "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.fayun = length * this.multiple;
      })
    // 订单池
    this._OrderServesService
      .getOrders('', 0, 100, "", "", " ", "", "", "", "", yestoday, "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.pool = length * this.multiple;
      })
  }
}
