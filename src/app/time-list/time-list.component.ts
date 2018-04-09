import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import * as  echarts from 'echarts';


@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {

  @Input()
  private multiple;

  private ownerOrder;
  @Input()
  private orders;
  private option;
  private timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    let timer1 = setInterval(() => {
      if (this.orders != undefined) {
        this.get();
        clearInterval(timer1);
        this.timer = setInterval(() => {
          this.get();
        }, 5000)
      }
    }, 1000)

  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get() {
    var myChart = echarts.init(document.getElementById('bar'));
    var bar1 = [];
    var label = [];
    for (let j = 0; j <= 3; j++) {
      bar1[j] = 0;
    }
    for (let i in this.orders) {
      switch (this.orders[i]['company']) {
        case 'YZH': bar1[0]++; break;
        case 'BD':
        case 'BSJP':
        case 'YC':
        case 'HLC':
        case 'HPH':
        case 'HQH':
        case 'HYB':
        case 'JAPU':
        case 'JUIJUNI':
        case 'JZ':
        case 'KLT':
        case 'MZL':
        case 'NYJY':
        case 'RB-B':
        case 'SSHG':
        case 'TIANKUO':
        case 'YBYJ':
        case 'YG':
        case 'SHJY':
        case 'CQLK': bar1[1]++; break;
        case 'JINGPAI':
        case 'TTXM':
        case 'JGZ': bar1[2]++; break;
        default: bar1[3]++; break;
      }
    }
    this.chartInit();
    this.option.xAxis[0].data = ['饰品组', '特服组', '食品组', '标准仓'];
    this.option.series[0].data = bar1;
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
        bottom: '0%',
        top: '11%',
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
 
}
