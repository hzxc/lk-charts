import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import * as  echarts from 'echarts';

@Component({
  selector: 'app-week-line',
  templateUrl: './week-line.component.html',
  styleUrls: ['./week-line.component.css']
})
export class WeekLineComponent implements OnInit {

  @Input()
   multiple;
   option;

   xLabel = [];
   data = [];

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
  }

  chartInit() {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        },
        textStyle: {
          fontSize: 8,
          color: '#7588E4',
        },
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: [],
        boundaryGap: false,
        splitLine: {
          show: true,
          interval: 'auto',
          lineStyle: {
            color: ['#464298']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#D5CBE8'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 7
          },
          rotate: 45
        },
        nameGap: 30,
        // boundaryGap: [0, '20%']
      }],
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          lineStyle: {
            color: ['#464298']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#D5CBE8'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 7
          }
        }
      },
      series: [{
        name: '单量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,

        data: [],
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, undefined, undefined, 1, [{
              offset: 0,
              color: 'rgba(199, 237, 250,0.1)'
            }, {
              offset: 1,
              color: 'rgba(199, 237, 250,0.1)'
            }], false)
          },
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' }
          ],
          animationDelay: 1000,
          animationDuration: 1000,
          symbolSize: 40,
          label: {
            fontSize: 8
          }
        },
        lineStyle: {
          normal: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
              }, {
                offset: 1, color: 'blue' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            opacity: 0.9
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(219,50,51)',
            borderColor: 'rgba(219,50,51,0.2)',
            borderWidth: 12
          }
        }
      }, {
        name: '发运量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' }
          ],
          animationDelay: 2000,
          animationDuration: 1000,
          symbolSize: 40,
          label: {
            fontSize: 8
          }
        },
        lineStyle: {
          normal: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'green' // 0% 处的颜色
              }, {
                offset: 1, color: 'yellow' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            opacity: 0.99
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 236, 212, 0)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 236, 212,0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(0,136,212)',
            borderColor: 'rgba(0,136,212,0.2)',
            borderWidth: 12
          }
        },
      }]
    };
  }
}