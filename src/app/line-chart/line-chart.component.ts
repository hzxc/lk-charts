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
export class LineChartComponent implements OnInit, OnDestroy {
  private provinceArray = [
    '安徽', '北京', '重庆', '福建', '甘肃',
    '广东', '广西', '贵州', '海南', '河北',
    '黑龙江', '河南', '湖北', '湖南', '云南',
    '浙江', '江苏', '江西', '吉林', '辽宁',
    '宁夏', '青海', '山东', '上海',
    '山西', '陕西', '四川', '天津', '台湾',
    '新疆', '西藏', '内蒙古'
  ];

  @Input()
  private orders;

  private provinceOrder = [];
  private option;
  private timer;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    var timer1 = setInterval(() => {
      if (this.orders != undefined) {
        this.chartsOnit();
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(this.option);
    
        this.getOrderByProvince();
        clearInterval(timer1);
      }
    }, 500)

    this.timer = setInterval(() => {
      this.getOrderByProvince();
    }, 10000)
  };
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getOrderByProvince() {
    this.provinceOrder = [];
    var data = [];

    for (let i = 0; i < this.provinceArray.length; i++) {
      data[i] = 0;
    }
    //分类
    for (let p in this.orders) {
      if (this.orders[p]['shipToState'] != null) {
        for (let i = 0; i < this.provinceArray.length; i++) {
          if ((this.provinceArray[i]).indexOf(this.orders[p]['shipToState'].substr(0, 2)) >= 0) {
            data[i]++; break;
          }
        }
      } else {
        // console.log(this.orders[p]);
      }
    }
    for (let j = 0; j < data.length; j++) {
      this.provinceOrder.push({ name: (this.provinceArray[j]), value: data[j] });
    }
    this.option.series[0].data = this.provinceOrder;
  }

  chartsOnit() {
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
          roam: true,
          label: {
            normal: {
              show: true,
              color: '#ccc'
            },
            emphasis: {
              show: true,
              color: "#000",
              areaColor: 'red',
              itemStyle: {
                color: 'red',
                borderColor: 'red'
              }
            }
          },
          data: [],
          zoom: 1
        }
      ],
      visualMap: {
        min: 0,
        max: 1000,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['orange', 'green', 'blue']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    };
  }
}
