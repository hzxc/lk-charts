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

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getOrder();
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
      var str = ymd.getFullYear() + "-" + (ymd.getMonth() + 1) + "-" + ymd.getDate();
      var str1 = ymd.getFullYear() + "-" + (ymd.getMonth() + 1) + "-" + (ymd.getDate() - 1);
      dateArray.push(str);
      newDateArray.push(str1)
    }
    for (let j = 0; j < dateArray.length; j++) {
      this._OrderServesService
        .getOrders('', 0, 0, "", "", " ", "", "", "", "", newDateArray[j] + "  16:00:00", "", dateArray[j] + "  16:00:00")
        .subscribe((res) => {
          var length = 0;
          for (let j in res) {
            length++;
          }
          xLabel[j] = (dateArray[j].substr(7) + '日');
          data[j] = (length);
          this.chartInit();
          this.option.xAxis[0].data = xLabel;
          this.option.series[0].data = data;
          // this.option.series[1].data = dateArray;
          // myChart.setOption(this.option);
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
      .getOrders('', 0, 0, "", "", " ", "", "", "", "", day, "", endDay)
      .subscribe((res) => {
        for (let i in res) {
          for (let k = 0; k < dateArray.length; k++) {
            if (res[i]['actualShipDateTime'] != null && (res[i]['actualShipDateTime']).indexOf(dayArray[k]) >= 0) {
              dateArray[k]++;
              break;
            }
          }
        }
        this.option.series[1].data = dateArray;
        console.log(dateArray);
        // myChart.setOption(this.option);
      })
  }

  chartInit() {
    this.option = {
      backgroundColor: '#464298',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '40%',
        top: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#0E2A43'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
              color: '#D5CBE8'
            }
          },
          axisTick: {
            show: false
          },
          data: []
        }, {
          axisPointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#0E2A43'
            }
          },
          axisTick: {
            show: false
          },
          position: 'bottom',
          offset: 20
        }],
      yAxis: [{
        type: 'value',
        name: '单位（%）',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#0E2A43'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
            color: '#D5CBE8'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#57617B'
          }
        }
      }],
      series: [{
        name: '单量',
        type: 'line',
        stack: '总量',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        animationDelay: 0,
        animationDuration: 1000,
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
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(219, 50, 51, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(219, 50, 51, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(219,50,51)',
            borderColor: 'rgba(219,50,51,0.2)',
            borderWidth: 12
          }
        },
        data: []
      },
      {
        name: '生产量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        stack: '总量',
        symbolSize: 5,
        animationDelay: 1000,
        animationDuration: 1000,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' }
          ],
          animationDelay: 2000,
          animationDuration: 1000
        },
        showSymbol: false,
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
                offset: 0, color: 'green' // 0% 处的颜色
              }, {
                offset: 1, color: 'yellow' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            opacity: 0.9
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 236, 212, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 236, 212, 0)'
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
        data: []
      }]
    };
  }
}





