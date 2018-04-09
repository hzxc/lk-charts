import { Component, OnInit } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import * as  echarts from 'echarts';

@Component({
  selector: 'app-send-time',
  templateUrl: './send-time.component.html',
  styleUrls: ['./send-time.component.css']
})
export class SendTimeComponent implements OnInit {

  option;

  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    this.getStateTime();
    setInterval(() => {
      this.getStateTime();
    }, 1000 * 60 * 30)
  }

  getStateTime() {
    var myChart = echarts.init(document.getElementById('pie'));
    var lastMonth = new Date(new Date().setDate(new Date().getDate() - 10));
    let data = [];
    var str= lastMonth.getFullYear() + '-' + (lastMonth.getMonth() + 1) + '-' + lastMonth.getDay()+' ';
    str+=new Date().getHours()+':' + new Date().getMinutes() +':'+ new Date().getSeconds()
    this._OrderServesService
      .getOrders("", 0, 0, "", "", "", "", "", "", "", str, "", "")
      .subscribe((res) => {
        let one = 0, two = 0, three = 0, four = 0, five = 0;
        for (let i in res) {
          if (res[i]['trailingSts'] == 900) {
            continue;
          } else {
            var hour = Math.ceil((Date.parse(new Date().toDateString()) - Date.parse(res[i]['createDateTime'])) / (1000 * 60 * 60));
            if (hour < 5) { one++ }
            if (hour > 5 && hour < 24) { two++ }
            if (hour > 24 && hour < 48) { three++ }
            if (hour > 48 && hour < 72) { four++ }
            if (hour > 72) { five++ }
          }
        }
        data.push({ value: one, name: '5小时之内' });
        data.push({ value: two, name: '24小时之内' });
        data.push({ value: three, name: '48小时之内' });
        data.push({ value: four, name: '72小时之内' });
        data.push({ value: five, name: '超过72小时' });
        this.chartsOnit();
        this.option.series[1].data = data;
        myChart.setOption(this.option);
      })
  }
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
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          data: [
            { value: 335, name: '直达' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1048, name: '百度' },
            { value: 251, name: '谷歌' },
            { value: 147, name: '必应' },
            { value: 102, name: '其他' }
          ]
        }
      ]
    };
  }
}
