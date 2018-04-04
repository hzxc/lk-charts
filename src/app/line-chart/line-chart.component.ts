import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { Console } from '@angular/core/src/console';
import { OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import * as  echarts from 'echarts';
import { values } from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit,OnDestroy { 
  private provinceArray = [
    '安徽', '北京', '重庆', '福建', '甘肃',
    '广东', '广西', '贵州', '海南', '河北',
    '黑龙江', '河南', '湖北', '湖南', '云南',
    '浙江', '江苏', '江西', '吉林', '辽宁',
    '内蒙古', '宁夏', '青海', '山东', '上海',
    '山西', '陕西', '四川', '天津',
    '新疆', '西藏'
  ];

  private provinceOrder = [];
  // private fiveOwnerOrder = [];
  private option;

  constructor(
    private _OrderServesService: OrderServesService
  ) {}

  ngOnInit(): void {
    this.getOrderByProvince();
  };
  ngOnDestroy(): void {
    
  }
 
  getOrderByProvince() {
    this.provinceOrder=[];
    var myChart = echarts.init(document.getElementById('main'));
    var yestoday=this._OrderServesService.formatTime(new Date());
    for (let i = 0; i < this.provinceArray.length; i++) {
      this._OrderServesService
        .getOrders('', 0, 0, "", this.provinceArray[i], " ", "", "", "", "", yestoday, "","")
        .subscribe((res) => {
          var number = 0;
          for (let j in res) {
            number++;
          }
          this.option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}：{c}'
            },
            series: [
              {
                name: '中国',
                type: 'map',
                mapType: 'china',
                selectedMode: 'multiple',
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: [],
                zoom:1
              }
            ],
            visualMap: {
              min: 0,
              max: 1000,
              text: ['高', '低'],
              realtime: false,
              calculable: true,
              inRange: {
                color: ['#F2D8D9','red']
              },
              textStyle: {
                color: '#fff'
              }
            },
            geo:{
              top:0,
              bottom:0,
              left:0,
              right:0
            }

          };
          if ((this.provinceArray[i]).substr(0, 2) == '内蒙') {
            this.provinceOrder.push({ name: (this.provinceArray[i]).substr(0, 3), value: number });
          } else if ((this.provinceArray[i]).substr(0, 2) == '黑龙') {
            this.provinceOrder.push({ name: (this.provinceArray[i]).substr(0, 3), value: number });
          } else
            this.provinceOrder.push({ name: (this.provinceArray[i]).substr(0, 2), value: number });
          this.option.series[0].data = this.provinceOrder;
          myChart.setOption(this.option);
        })
    }
  }
}
