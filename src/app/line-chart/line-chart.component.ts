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
export class LineChartComponent implements OnInit {

  private provinceArray = [
    '安徽省', '北京市', '重庆市', '福建省', '甘肃省',
    '广东省', '广西省', '贵州省', '海南省', '河北省',
    '黑龙江省', '河南省', '湖北省', '湖南省', '云南省',
    '浙江省', '江苏省', '江西省', '吉林省', '辽宁省',
    '内蒙古', '宁夏', '青海', '山东省', '上海市',
    '山西省', '陕西省', '四川省', '天津市',
    '新疆维吾尔自治区', '西藏自治区'
  ];

  private provinceOrder = [];
  // private fiveOwnerOrder = [];
  private option;

  constructor(
    private _OrderServesService: OrderServesService
  ) {

  }

  ngOnInit(): void {
    this.getOrderByProvince();


  };
  formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    return year + '-' + month + '-' + (day-1)+" 18:00:00";
  } 
  getOrderByProvince() {
    this.provinceOrder=[];
    var myChart = echarts.init(document.getElementById('main'));
    var yestoday=this.formatTime(new Date());
    for (let i = 0; i < this.provinceArray.length; i++) {
      this._OrderServesService
        .getOrders('', 0, 0, "", this.provinceArray[i], " ", "", "", "", "", "yestoday", "")
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
                color: ['#089AD6', 'yellow', 'orangered']
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
