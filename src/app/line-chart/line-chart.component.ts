import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { Console } from '@angular/core/src/console';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {

  private provinceArray = [
    '安徽省', '北京市', '重庆市', '福建省', '甘肃省',
    '广东省', '广西省', '贵州省', '海南省', '河北省',
    '黑龙江省', '河南省', '湖北省', '湖南省', '云南省',
    '浙江省', '江苏省', '江西省', '吉林省', '辽宁省',
    '内蒙古', '宁夏', '青海', '山东省', '上海市',
    '山西省', '陕西省', '四川省', '天津市',
    '新疆维吾尔自治区', '西藏自治区'
  ];
  private data = [];
  @Input()
  private multiple;

  private timer;

  constructor(
    private _OrderServesService: OrderServesService
  ) {

  }
  ngOnInit(): void {
    this.getTotalByProvince();
    this.timer = setInterval(() => {
      this.getTotalByProvince();
    }, 1000 * 60 * 30)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getTotalByProvince() {
    let _lineChartData: Array<any> = new Array();
    _lineChartData[0] = {
      data: new Array(),
      label: '单量'
    };
    this.lineChartLabels = [];
    for (let i = 0; i < this.provinceArray.length; i++) {
      this._OrderServesService
        .getOrders('', 0, 0, "", this.provinceArray[i], " ", "", "", "", "", "", "")
        .subscribe((res) => {
          var length = 0;
          for (let j in res) {
            length++;
          }
          if (length > 0) {
            // this.data[i] = length;
            this.lineChartLabels.push(this.provinceArray[i]);
            _lineChartData[0].data.push(length * this.multiple);
            this.lineChartData = _lineChartData.concat();
          }
        })
    }
  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(18,149,219,0.2)',
      borderColor: 'rgba(18,149,219,1)',
      pointBackgroundColor: 'rgba(18,149,219,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(18,149,219,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
}
