import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-finish-state',
  templateUrl: './finish-state.component.html',
  styleUrls: ['./finish-state.component.css']
})
export class FinishStateComponent implements OnInit, OnDestroy {


  private sendOrder = [];
  private fiveSendOrder = []

  @Input()
  private multiple;
  @Input()
  private orders;

  private timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    // var timer1;
    // timer1 = setInterval(() => {
    //   if (this.orders != undefined) {
    //     this.getOrderByOwner();
    //     clearInterval(timer1);
    //     this.timer = setInterval(() => {
    //       this.getOrderByOwner();
    //     }, 1000*60*30)
    //   }
    // }, 500)
 
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getOrderByOwner() {
    var yestoday = this._OrderServesService.formatTime(new Date());

    this.sendOrder = [];
    this.fiveSendOrder = [];

    this._OrderServesService
      .getOwners()
      .subscribe((result) => {
        for (let i in result) {
          var total = 0, send = 0;
          for (let k in this.orders) {
            if (this.orders[k].company === result[i]['id']) {
              total++;
            }
          }
          if (total > 0) {
            for (let k in this.orders) {
              if (this.orders[k].company === result[i]['id'] && this.orders[k]['trailingSts'] == '900') {
                send++;
              }
            }
          }
          this.sendOrder.push({ 'name': result[i]['id'], 'total': total * this.multiple, 'send': send * this.multiple });
          this.sendOrder.sort(this.sortTotal);
          this.fiveSendOrder = this.sendOrder.concat();
          this.fiveSendOrder.splice(6);
        }
      })
  }

  sortTotal(a, b) {
    return b.total - a.total
  }


}
