import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as  echarts from 'echarts';

@Component({
  selector: 'app-bar-cart',
  templateUrl: './bar-cart.component.html',
  styleUrls: ['./bar-cart.component.css']
})
export class BarCartComponent implements OnInit {

  @Input()
   multiple;
  @Input()
   countArray;

   timer;
   option;


  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    var timer1;
    timer1 = setInterval(() => {
      this.getRandState();
      if (this.countArray.length>1) {
        // this.getState();
        clearInterval(timer1);

        this.timer = setInterval(() => {
          // this.getState();
          this.getRandState();
        }, 1000*60*5)

      }
    }, 5000)
  }

  getRandState(){
    var dataArray = [];
    for(let i=0;i<9;i++){
      dataArray.push(this._OrderServesService.getRand());    
    }

    var myChart = echarts.init(document.getElementById('state'));
    this.chartInit();
    this.option.series[0].data = dataArray.concat();
    this.option.series[1].data = dataArray.concat();
    myChart.setOption(this.option);

  }

  getState() {
    var dataArray = [];
    var yestoday = this._OrderServesService.rCreateTime();
    //处理倍数
    for (let i = 0; i < this.countArray.length; i++) {
      dataArray[i] = this.countArray[i]['amount'] * this.multiple;
    }

    var myChart = echarts.init(document.getElementById('state'));
    this.chartInit();
    this.option.series[0].data = dataArray.concat();
    this.option.series[1].data = dataArray.concat();
    myChart.setOption(this.option);
  }
  chartInit() {
    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '0%',
        right: '10%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['订单池', '波次中', '待拣货', '拣货完', '验货完', '称重完', '集货', '装载', '已发运'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
              fontSize: 5
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
              fontSize: 7
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#172449'
            }
          }
        }
      ],
      series: [
        {
          name: '单数',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  '#01FFFD',
                ];
                return colorList[params.dataIndex]
              }, label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                fontSize: 7
              }
            }
          },
          barWidth: '30%'
        },
        {
          type: 'line',
          color: "#9DC4FA", //折线图颜色,搭配markArea为面积图
          lineStyle: { //折线的颜色
            color: "#3B9DFC"
          },
          smooth: true, //是否平滑处理值0-1,true相当于0.5
          data: [67, 30, 70, 40, 50, 25, 30, 25, 34, 45, 51, 43, 38],
          markArea: {
            data: [
              [{
                xAxis: '08:00'
              }, {
                xAxis: '19:59'
              }]
            ]
          }
        }
      ]
    };
  }
  sortTotal(a, b) {
    return a - b
  }
}

