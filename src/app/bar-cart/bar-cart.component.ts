import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as  echarts from 'echarts';

@Component({
  selector: 'app-bar-cart',
  templateUrl: './bar-cart.component.html',
  styleUrls: ['./bar-cart.component.css']
})
export class BarCartComponent implements OnInit, OnDestroy {


  @Input()
  private orders;

  private timer;
  private option;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    this.getState();

    var timer;
    timer = setInterval(() => {
      if (this.orders != undefined) {
        this.getState();
        clearInterval(timer);
      }
    }, 500)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer)
  }
  getState() {
    var stateArray = [];
    var label = [];
    var data = [];
    var yesterday = this._OrderServesService.formatTime(new Date());
    // 已发运

    for (let j in this.orders) {
      stateArray.push(this.orders[j]['trailingSts']);
    }
    stateArray = this._OrderServesService.unique(stateArray).concat();
    stateArray.sort(this.sortTotal);
    var dataArray: number[] = new Array(stateArray.length);
    for (let j = 0; j < stateArray.length; j++) {
      dataArray[j] = 0;
    }
    for (let i in this.orders) {
      for (let j = 0; j < stateArray.length; j++) {
        if (this.orders[i]['trailingSts'] == stateArray[j]) {
          dataArray[j]++;
        }
      }
    }
    for (let j = 0; j < stateArray.length; j++) {
      if (stateArray[j] == '100') stateArray[j] = '订单池';
      if (stateArray[j] == '200') stateArray[j] = '波次中';
      if (stateArray[j] == '201') stateArray[j] = '201';
      if (stateArray[j] == '300') stateArray[j] = '待拣货';
      if (stateArray[j] == '700') stateArray[j] = '待复核';
      if (stateArray[j] == '800') stateArray[j] = '已复核';
      if (stateArray[j] == '850') stateArray[j] = '待发运';
      if (stateArray[j] == '900') stateArray[j] = '已发运';
    }
    var myChart = echarts.init(document.getElementById('state'));
    this.chartInit();
    this.option.xAxis[0].data = stateArray.concat();
    this.option.series[0].data = dataArray.concat();
    myChart.setOption(this.option);
  }
  chartInit() {
    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '45%',
        top: '10%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc'
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
              color: '#ccc'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#514D97'
            }
          }
        }
      ],
      series: [
        {
          name: '单数',
          type: 'bar',
          data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  '#C1232B', '#B5C334', '#FCCE10', '#E87C25',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ];
                return colorList[params.dataIndex]
              }, label: {
                show: true,
                position: 'top',
                formatter: '{c}'
              }
            }
          }
        }
      ]
    };
  }
  sortTotal(a, b) {
    return a - b
  }
}

