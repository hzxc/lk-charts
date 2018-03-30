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

  private timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getOrderByOwner();
    this.timer = setInterval(() => {
      this.getOrderByOwner();
    }, 1000 * 60 * 30)
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
          for (let j in result[i]) {
            this._OrderServesService
              .getOrders(result[i][j], 0, 0, "", '', " ", "", "", "", "", yestoday, "")
              .subscribe((res) => { 
                let length = 0;
                for (let k in res)
                  length++;
                if (length > 0) {
                  this._OrderServesService
                    .getOrders(result[i][j], 0, 900, "", '', " ", "", "", "", "",yestoday, "")
                    .subscribe((r) => {
                      let t = 0;
                      for (let k in r)
                        t++;
                      this.sendOrder.push({ 'name': result[i][j], 'total': length * this.multiple, 'send': t * this.multiple });
                      this.sendOrder.sort(this.sortTotal);
                      this.fiveSendOrder = this.sendOrder.concat();
                      this.fiveSendOrder.splice(6);
                    })
                }
              })
          }
        }
      })
  }

  sortTotal(a, b) {
    return b.total - a.total
  }


}
