import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {

  @Input()
  private multiple;

  private ownerOrder;
  @Input()
  private fiveOwnerOrder;

  private data = [];
  private timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    let timer1 = setInterval(() => {
      if (this.fiveOwnerOrder.length >= 81) {
        this.get();
        clearInterval(timer1);
      }
    }, 1000)

    this.timer = setInterval(() => {
      this.get();
    }, 1000 * 60 * 60)    
  }


  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get() {
    this.data = [];
    for (let i = 0; i < 8; i++) {
      this.data.push(this.fiveOwnerOrder[i]['total']);
      this.barChartLabels[i]=this.fiveOwnerOrder[i]['name']
    }
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.data;
    this.barChartData = clone;
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['', '', '', '', '','','',''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [25], label: '单量' },
  ];

  public barChartColors: Array<any> = [
    { // orange
      backgroundColor: 'rgba(255,165,0,0.8)',
      borderColor: 'rgba(255,165,0,1)',
      pointBackgroundColor: 'rgba(255,165,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,165,0,0.8)'
    },
  ];
}
