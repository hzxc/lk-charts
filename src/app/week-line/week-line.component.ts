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
  private multiple;
  private option;

  private xLabel = [];
  private data = [];

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getOrder();
    this.getProduct();

  }

  getOrder() {
    var xLabel = [];
    var data = [];
    var dateArray = [];
    var newDateArray = [];
    var myChart = echarts.init(document.getElementById('line'));
    var today = new Date();
    var ymd = new Date(today.setDate(today.getDate() - 11));
    for (let i = 0; i < 10; i++) {
      ymd = new Date(ymd.setDate(ymd.getDate() + 1));
      let yestoday = new Date(ymd);
      yestoday.setDate(yestoday.getDate() - 1);
      var str = ymd.getFullYear() + "-" + (ymd.getMonth() + 1) + "-" + ymd.getDate();
      var str1 = yestoday.getFullYear() + "-" + (yestoday.getMonth() + 1) + "-" + (yestoday.getDate());
      dateArray.push(str);
      newDateArray.push(str1)
    }
    for (let j = 0; j < dateArray.length; j++) {
      this._OrderServesService
        .getOrders("", 0, 0, "", "", " ", "", "", "", "", newDateArray[j] + "  16:00:00", "", dateArray[j] + "  16:00:00")
        .subscribe((res) => {          
          var length = 0;
          for (let j in res) {
            length++;
          }
          xLabel[j] = (dateArray[j].substr(7) + '日');
          data[j] = (length);
          this.xLabel = xLabel;
          this.data = data;
        })
    }
    this.getProduct();
  }

  getProduct() {
    var myChart = echarts.init(document.getElementById('line'));
    let dayArray = [];
    let dateArray = [];
    var now = new Date();
    now.setDate(now.getDate() - 12);
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var day = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate()) + " 00:00:00";
    var endDay = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + (yesterday.getDate()) + " 23:59:59"

    var ymd = new Date(new Date().setDate(new Date().getDate() - 11));
    for (let i = 0; i < 10; i++) {
      ymd = new Date(ymd.setDate(ymd.getDate() + 1));
      var str = ymd.getFullYear() + "-";
      var str1 = [((ymd.getMonth() + 1) < 10) ? '0' + (ymd.getMonth() + 1) : (ymd.getMonth() + 1)] + "-"
      var str2 = (ymd.getDate() < 10) ? '0' + ymd.getDate() : ymd.getDate();
      dayArray.push(str + str1 + str2);
    }
    for (let j = 0; j < dayArray.length; j++) {
      dateArray[j] = 0
    }
    this._OrderServesService
      .getOrders("", 0, 0, "", "", "","", "", "", "", day, "", endDay)
      .subscribe((res) => {
        for (let i in res) {
          for (let k = 0; k < dateArray.length; k++) {
            if (res[i]['actualShipDateTime'] != null && (res[i]['actualShipDateTime']).indexOf(dayArray[k]) >= 0) {
              dateArray[k]++;
              break;
            }
          }
        }
        this.chartInit();
        this.option.xAxis[0].data = this.xLabel;
        this.option.series[0].data = this.data;
        this.option.series[1].data = dateArray;
        myChart.setOption(this.option);
      })
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
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
          color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '10%',
        containLabel: true
      },
      xAxis:[{
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
            fontSize: 14
          }
        }
      }],
      yAxis: {
        type: 'value',
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
            fontSize: 14
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
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(199, 237, 250,0.1)'
            }, {
              offset: 1,
              color: 'rgba(199, 237, 250,0.1)'
            }], false)
          }
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' }
          ],
          animationDelay: 1000,
          animationDuration: 1000
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
                offset: 1, color: 'yellowgreen' // 100% 处的颜色
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
          animationDuration: 1000
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