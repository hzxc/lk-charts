import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import * as  echarts from 'echarts';

@Component({
  selector: 'app-send-time',
  templateUrl: './send-time.component.html',
  styleUrls: ['./send-time.component.css']
})
export class SendTimeComponent implements OnInit {

  option;
  @Input()
   multiple;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    // this.getStateTime();
    // setInterval(() => {
    //   this.getStateTime();
    // }, 1000 * 60 * 60 * 2)
  }

  // getStateTime() {
  //   var myChart = echarts.init(document.getElementById('pie'));
  //   var lastMonth = new Date(new Date().setDate(new Date().getDate() - 10));
  //   let data = [];
  //   var str = lastMonth.getFullYear() + '-' + (lastMonth.getMonth() + 1) + '-' + lastMonth.getDay() + ' ';
  //   str += new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  //   this._OrderServesService
  //     .getOrders(undefined, undefined, undefined, 100, 100, undefined, undefined, undefined,'NORMAL', undefined, undefined, undefined, undefined, 72, undefined)
  //     .subscribe((res) => {
  //       let length = 0;
  //       for (let i in res['result']) {
  //         length++
  //       }
  //       data.push({ value: length, name: '超过72小时' })
  //       this.chartsOnit();
  //       this.option.series[1].data = data;
  //       myChart.setOption(this.option);
  //     })
  //   this._OrderServesService
  //     .getOrders(undefined, undefined, undefined, 100, 100, undefined, undefined, undefined, 'NORMAL', undefined, undefined, undefined, undefined, 48, 72)
  //     .subscribe((res) => {
  //       let length = 0;
  //       for (let i in res['result']) {
  //         length++
  //       }       
  //       data.push({ value: length, name: '72小时之内' });
  //       this.chartsOnit();
  //       this.option.series[1].data = data;
  //       myChart.setOption(this.option);
  //     })
  //   this._OrderServesService
  //     .getOrders(undefined, undefined, undefined, 100, 100, undefined, undefined, undefined, 'NORMAL', undefined, undefined, undefined, undefined, 24, 48)
  //     .subscribe((res) => {
  //       let length = 0;
  //       for (let i in res['result']) {
  //         length++
  //       }
  //       data.push({ value: length, name: '48小时之内' })
  //       this.chartsOnit();
  //       this.option.series[1].data = data;
  //       myChart.setOption(this.option);
  //     })
  //   this._OrderServesService
  //     .getOrders(undefined, undefined, undefined, 100, 100, undefined, undefined, undefined,'NORMAL', undefined, undefined, undefined, undefined, 5, 24)
  //     .subscribe((res) => {        
  //       let length = 0;
  //       for (let i in res['result']) {
  //         length++
  //       }
  //       data.push({ value: length, name: '24小时之内' })
  //       this.chartsOnit();
  //       this.option.series[1].data = data;
  //       myChart.setOption(this.option);
  //     })
  //   this._OrderServesService
  //     .getOrders(undefined, undefined, undefined, 100, 100, undefined, undefined, undefined, 'NORMAL', undefined, undefined, undefined, undefined, undefined, 5)
  //     .subscribe((res) => {
  //       let length = 0;
  //       for (let i in res['result']) {
  //         length++
  //       }
  //       data.push({ value: length, name: '5小时之内' })
  //       this.chartsOnit();
  //       this.option.series[1].data = data;
  //       myChart.setOption(this.option);
  //     })
  // }
  chartsOnit() {
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)",
        position: [10, 20]
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: ['25%', '75%'],
          label: {
            normal: {
              position: 'inner',
            }
          }
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['27%', '50%'],
          label: {
            fontSize: 6,
          },
          labelLine: {
            normal: {
              length: 5,
              length2: 5
            }
          },
          data: [
            { value: 0, name: '直达' },
            { value: 0, name: '邮件营销' },
            { value: 0, name: '联盟广告' },
            { value: 0, name: '视频广告' },
            { value: 0, name: '百度' },
            { value: 0, name: '谷歌' },
            { value: 0, name: '必应' },
            { value: 0, name: '其他' }
          ]
        }
      ]
    };
  }
}
