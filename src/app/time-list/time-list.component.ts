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

   owners = [];

  @Input()
   multiple;

   ownerOrder;
  @Input()
   orders;
   option;
   timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    this.getOwners();
    let timer1 = setInterval(() => {
      if (this.orders != undefined) {
        this.get();
        clearInterval(timer1);
        this.timer = setInterval(() => {
          this.get();
        }, 30000)
      }
    }, 1000)

  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }


  getOwners() {
    // this._OrderServesService
    //   .getOwnersLk02()
    //   .subscribe((res) => {
    //     this.owners = res['result'];

    //   })
  }

  get() {
    if (this.owners.length > 0) {
      for (let z = 0; z < this.owners.length; z++) {
        if (this.owners[z]['code'].indexOf('CS') >= 0) {
          this.owners.splice(z, 1);
        }
      }
    }
    var myChart = echarts.init(document.getElementById('bar'));
    var bar1 = [];
    var label = [];
    for (let j = 0; j <= this.owners.length; j++) {
      bar1[j] = 0;
    }
    for (let i = 0; i < this.owners.length; i++) {
      label[i] = this.owners[i]['code']
    }
    for (let k = 0; k < this.orders.length; k++) {
      if (this.orders[k]['companyCode'].indexOf('CS') > 0) {
        break;
      } else {
        for (let z = 0; z < this.owners.length; z++) {
          if (this.orders[k]['companyCode'] == this.owners[z]['code']) {
            bar1[z]++; break;
          }
        }
      }
    }

    //处理倍数
    for (let j = 0; j < bar1.length; j++) {
      bar1[j] = bar1[j] * this.multiple;
    }
    this.chartInit();
    this.option.xAxis[0].data = label;
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
        itemSize: 6,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '25%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
              fontSize: 7
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
              color: '#514D97'
            }
          }
        }
      ],
      series: [
        {
          name: '单数',
          type: 'bar',
          barWidth: 30,
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
                formatter: '{c}',
                fontSize: 7
              }
            }
          }
        }
      ]
    };
  }

}
