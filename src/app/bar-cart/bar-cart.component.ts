import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { timer } from 'd3';

@Component({
  selector: 'app-bar-cart',
  templateUrl: './bar-cart.component.html',
  styleUrls: ['./bar-cart.component.css']
})
export class BarCartComponent implements OnInit, OnDestroy {

  @Input()
  private multiple;

  private data = [];
  private timer;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    this.getState();
    this.timer=setInterval(()=>{
      this.getState();
    },1000*60*30)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer)
  }
  getState() {
    // 已发运
    this._OrderServesService
      .getOrders('', 0, 900, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.data[0] = length*this.multiple;
      })
    // 已复核'
    this._OrderServesService
      .getOrders('', 0, 800, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.data[1] = length*this.multiple;
      })
    // 待复核
    this._OrderServesService
      .getOrders('', 0, 700, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.data[2] = length*this.multiple;
      })
    // 拣货中
    this._OrderServesService
      .getOrders('', 0, 450, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.data[3] = length*this.multiple;
      })
    // 待拣货
    this._OrderServesService
      .getOrders('', 0, 300, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.data[4] = length*this.multiple;
        // 订单池
        this._OrderServesService
          .getOrders('', 0, 100, "", "", " ", "", "", "", "", "", "")
          .subscribe((result) => {
            var length = 0;
            for (let j in result) {
              length++;
            }
            this.data[5] = length*this.multiple;
            let clone = JSON.parse(JSON.stringify(this.barChartData));
            clone[0].data = this.data;
            this.barChartData = clone;
          })

      })

  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['已发运', '已复核', '待复核', '拣货中', '待拣货', '订单池'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [25], label: '状态' },
  ];

  public barChartColors: Array<any> = [
    { // yellow
      backgroundColor: 'rgba(255,255,0,0.8)',
      borderColor: 'rgba(255,255,0,1)',
      pointBackgroundColor: 'rgba(255,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,0,0.8)'
    },
  ];
}

