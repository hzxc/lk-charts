import { Component, OnInit, Input } from '@angular/core';
import * as  echarts from 'echarts';
import { OrderServesService } from '../shared/order-serves.service';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {

  @Input()
  private orders;

  private option;
  private timer1;

  constructor(
    private _: OrderServesService
  ) { }
  ngOnInit() {
    var timer;
    timer = setInterval(() => {
      if (this.orders != undefined) {
        this.getCarrier();
        clearInterval(timer);
      }
    }, 500);
    this.timer1 = setInterval(() => {
      this.getCarrier();
    }, 5000);
  }

  //YUNDA ZTO ZT SF POSTB
  getCarrier() {
    var carrierArray = [];
    var newcarrierArray = [];
    for (let i in this.orders) {
      carrierArray.push(this.orders[i]['carrier']);
    }
    carrierArray = this._.unique(carrierArray).concat();
    newcarrierArray = carrierArray.concat();
    for (let z = 0; z < carrierArray.length; z++) {
      for (let k = 0; k < newcarrierArray.length; k++) {
        if (newcarrierArray[k] == "STO" ||
          newcarrierArray[k] == "ZTO" ||
          newcarrierArray[k] == "YUNDA" ||
          newcarrierArray[k] == 'POSTB' ||
          newcarrierArray[k] == 'SF') { }
        else {
          newcarrierArray.splice(k, 1);
        }
      }
    }

    var complate: number[] = new Array(newcarrierArray.length);
    var unfinished: number[] = new Array(newcarrierArray.length);
    for (let j = 0; j < newcarrierArray.length; j++) {
      complate[j] = 0;
      unfinished[j] = 0
    }
    for (let i in this.orders) {
      for (let j = 0; j < newcarrierArray.length; j++) {
        if (this.orders[i]['carrier'] === newcarrierArray[j] && this.orders[i]['trailingSts'] == '900') {
          complate[j]++; break;
        }
        if (this.orders[i]['carrier'] === newcarrierArray[j]) {
          unfinished[j]++; break;
        }
      }
    }
    for (let k = 0; k < newcarrierArray.length; k++) {
      if (newcarrierArray[k] == "STO") { newcarrierArray[k] = '申通'; }
      if (newcarrierArray[k] == "ZTO") { newcarrierArray[k] = '中通'; }
      if (newcarrierArray[k] == "YUNDA") { newcarrierArray[k] = '韵达'; }
      if (newcarrierArray[k] == "POSTB") { newcarrierArray[k] = '邮政'; }
      if (newcarrierArray[k] == "SF") { newcarrierArray[k] = '顺丰'; }
    }
    var myChart = echarts.init(document.getElementById('carrier'));
    this.chartInit();
    this.option.xAxis[0].data = newcarrierArray;
    this.option.series[0].data = complate;
    this.option.series[1].data = unfinished;
    myChart.setOption(this.option);
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
        right: '0%',
        bottom: '0%',
        top: '3%',
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
        name: '单量',
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
        name: '已发运',
        type: 'line',
        smooth: true,
        stack: '总量',
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        animationDelay: 2000,
        animationDuration: 1000,
        markPoint: {
          // symbol: 'image://url',
          data: [
            { type: 'max', name: '最大值' }
          ],
          animationDelay: 3000,
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
                offset: 0, color: '#088EC5' // 0% 处的颜色
              }, {
                offset: 1, color: 'grey' // 100% 处的颜色
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
              color: 'rgba(137, 189, 27, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(137, 189, 27, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(137,189,27)',
            borderColor: 'rgba(137,189,2,0.27)',
            borderWidth: 12

          }
        },
        data: [220, 182, 191, 134, 250, 120, 110, 125, 145, 122, 165, 122]
      }, {
        name: '未发运',
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
        data: [120, 110, 125, 145, 122, 165, 122, 220, 282, 191, 134, 150]
      }]
    };
  }
}
