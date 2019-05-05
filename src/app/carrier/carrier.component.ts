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
  multiple;

  option;
  timer1;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }
  ngOnInit() {
    // this.getCarrier();
    this.getRandCarrier();

    this.timer1 = setInterval(() => {
      // this.getCarrier();
      this.getRandCarrier();
    }, 1000 * 60 * 5);
  }

  getRandCarrier() {
    var myChart = echarts.init(document.getElementById('carrier'));
    this.chartInit();

    this.option.xAxis[0].data = ['SF', 'ZTO', 'YUNDA', 'HTKY', 'YTO', 'WL'];
    this.option.series[0].data = [
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
    ];
    this.option.series[1].data = [
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
      this._OrderServesService.getRand() * 10,
    ];
    myChart.setOption(this.option);
  }
  //YUNDA ZTO ZT SF POSTB
  getCarrier() {
    let carrierArray = [];
    let carrierArray01 = [];
    let carrierArray02 = [];
    let newcarrierArray = [];
    let complate = [];
    let unfinished = [];

    this._OrderServesService
      .GetEachCarrierOrderAmount(this._OrderServesService.rCreateTime(), 'lk01')
      .subscribe((r1) => {
        carrierArray01 = r1['result'];
        this._OrderServesService
          .GetEachCarrierOrderAmount(this._OrderServesService.rCreateTime(), 'lk02')
          .subscribe((r2) => {
            carrierArray02 = r2['result'];
            for (let i = 0; i < carrierArray01.length; i++) {
              carrierArray.push({
                'carrierCode': carrierArray01[i]['carrierCode'],
                'amount': carrierArray01[i]['amount'] + carrierArray02[i]['amount'],
                'amount700': carrierArray01[i]['amount700'] + carrierArray02[i]['amount700']
              });
            }
            carrierArray = carrierArray.sort(this.sortTotal);
            //处理倍数
            for (let i = 0; i < 6; i++) {
              newcarrierArray[i] = carrierArray[i]['carrierCode'];
              complate[i] = carrierArray[i]['amount700'] * this.multiple;
              unfinished[i] = (carrierArray[i]['amount'] - carrierArray[i]['amount700']) * this.multiple;
            }

            var myChart = echarts.init(document.getElementById('carrier'));
            this.chartInit();
            this.option.xAxis[0].data = newcarrierArray;
            this.option.series[0].data = complate;
            this.option.series[1].data = unfinished;
            myChart.setOption(this.option);

          })
      })


    // for (let i in this.orders01) {
    //   carrierArray.push(this.orders01[i]['carrierCode']);
    // }
    // for (let i in this.orders02) {
    //   carrierArray.push(this.orders02[i]['carrierCode']);
    // }
    // carrierArray = this._.unique(carrierArray).concat();
    // newcarrierArray = carrierArray.concat();

    // for (let z = 0; z < carrierArray.length; z++) {
    //   for (let k = 0; k < newcarrierArray.length; k++) {
    //     if (newcarrierArray[k] == "HTKY" ||
    //       newcarrierArray[k] == "ZTO" ||
    //       newcarrierArray[k] == "YUNDA" ||
    //       newcarrierArray[k] == 'POSTB' ||
    //       newcarrierArray[k] == 'SF') { }
    //     else {
    //       newcarrierArray.splice(k, 1);
    //     }
    //   }
    // }

    // // console.log(newcarrierArray);
    // var complate: number[] = new Array(newcarrierArray.length);
    // var unfinished: number[] = new Array(newcarrierArray.length);
    // for (let j = 0; j < newcarrierArray.length; j++) {
    //   complate[j] = 0;
    //   unfinished[j] = 0
    // }
    // for (let i in this.orders01) {
    //   for (let j = 0; j < newcarrierArray.length; j++) {
    //     if (this.orders01[i]['carrier'] === newcarrierArray[j] && this.orders01[i]['leadingSts'] >= '800') {
    //       complate[j]++; break;
    //     }
    //     if (this.orders01[i]['carrier'] === newcarrierArray[j]) {
    //       unfinished[j]++; break;
    //     }
    //   }
    // }
    // for (let i in this.orders02) {
    //   for (let j = 0; j < newcarrierArray.length; j++) {
    //     if (this.orders02[i]['carrierCode'] === newcarrierArray[j] && this.orders02[i]['leadingSts'] >= '700') {
    //       complate[j]++; break;
    //     }
    //     if (this.orders02[i]['carrierCode'] === newcarrierArray[j]) {
    //       unfinished[j]++; break;
    //     }
    //   }
    // }


    // for (let k = 0; k < newcarrierArray.length; k++) {
    //   if (newcarrierArray[k] == "HTKY") { newcarrierArray[k] = '百世'; }
    //   if (newcarrierArray[k] == "ZTO") { newcarrierArray[k] = '中通'; }
    //   if (newcarrierArray[k] == "YUNDA") { newcarrierArray[k] = '韵达'; }
    //   if (newcarrierArray[k] == "POSTB") { newcarrierArray[k] = '邮政'; }
    //   if (newcarrierArray[k] == "SF") { newcarrierArray[k] = '顺丰'; }
    // }
    // var myChart = echarts.init(document.getElementById('carrier'));
    // this.chartInit();
    // this.option.xAxis[0].data = newcarrierArray;
    // this.option.series[0].data = complate;
    // this.option.series[1].data = unfinished;
    // myChart.setOption(this.option);
  }

  sortTotal(a, b) {
    return b.amount - a.amount
  }


  chartInit() {
    this.option = {
      "tooltip": {
        "trigger": "axis",
        "axisPointer": {
          "type": "cross",
          "crossStyle": {
            "color": "#384757"
          }
        }
      },
      "legend": {
        "data": [
          {
            "name": "已发运",
            "icon": "circle",
            "textStyle": {
              "color": "#7d838b",
              "fontSize": "9"
            }
          },
          {
            "name": "未发运",
            "icon": "circle",
            "textStyle": {
              "color": "#7d838b",
              "fontSize": "9"
            }
          }
        ],
        "top": "0",
        "textStyle": {
          "color": "#fff"
        }
      },
      grid: {
        top: "3%",
        left: '10%',
        right: '0',
        bottom: '25%'
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1街",
            "2街",
            "3街",
            "4街",
            "5街",
            "6街"
          ],
          axisPointer: {
            type: "shadow"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#7d838b"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          nameTextStyle: {
            color: "#7d838b",
            fontSize: "9"

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#7d838b",
              fontSize: "9"
            }
          },
          axisLine: {
            show: true
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }
        }
      ],
      series: [
        {
          name: '已发运',
          type: 'bar',
          barGap: 0,
          itemStyle: {
            opacity: 1,
            color: '#00B9F4',
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: 7
          },
          barWidth: '25%',
          data: [0, 1158, 103, 160, 242],
        },
        {
          name: '未发运',
          type: 'bar',
          itemStyle: {
            opacity: 1,
            color: '#F2CF76',
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: 7
          },
          barWidth: '25%',
          data: [0, 2342, 307, 443, 349]
        },
      ]
    };
  }
}
