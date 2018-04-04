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
  private fiveOwnerOrder;
  private option;
  private timer;
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    let timer1 = setInterval(() => {
      if (this.fiveOwnerOrder.length >= 81) {
        this.get();
        clearInterval(timer1);
      }
    }, 1000)

    this.timer = setInterval(() => {
      this.get();
    }, 1000 * 60 * 60)
  }


  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get() {
    var myChart = echarts.init(document.getElementById('bar'));
    var bar1 = [];
    var bar2 = [];
    var label = [];
    for (let i = 0; i < 5; i++) {
      bar1[i] = (this.fiveOwnerOrder[i]['total']);
      label[i] = (this.fiveOwnerOrder[i]['name']);
      var today = new Date();
      var ymd = new Date(today.setDate(today.getDate() - 1));
      var str = ymd.getFullYear() + "-" + (ymd.getMonth() + 1) + "-" + ymd.getDate();
      this._OrderServesService
        .getOrders(this.fiveOwnerOrder[i]['name'], 0, 0, "", "", " ", "", "", "", "", str + "  00:00:00", "", str + "  23:59:59")
        .subscribe((res) => {
          var length = 0;
          for (let j in res) {
            length++
          }
          bar2[i] = (length);
          this.chartInit();
          this.option.xAxis[0].data = label;
          this.option.series[0].data = bar1;
          this.option.series[1].data = bar2;
          myChart.setOption(this.option);
        })
    }

  }

  chartInit() {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['今日', '昨日'],
        align: 'right',
        right: 10,
        textStyle: {    //图例文字的样式
          color: '#fff',
          fontSize: 12
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '45%',
        containLabel: true,
      },
      xAxis: [{
        splitLine: { show: false },//去除网格线
        type: 'category',
        data: [],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc'
          }
        }
      }],
      yAxis: [{
        type: 'value',
        name: '总量(单)',
        axisLabel: {
          formatter: '{value}',
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
      }],
      series: [{
        name: '今日',
        type: 'bar',
        data: [],
        itemStyle: {
          normal: {
            color: 'orange'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }, {
        name: '昨日',
        type: 'bar',
        data: [],
        itemStyle: {
          normal: {
            color: '#4ad2ff'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }]
    };
  }

  // public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels: string[] = ['', '', '', '', '', '', '', ''];
  // public barChartType: string = 'bar';
  // public barChartLegend: boolean = true;

  // public barChartData: any[] = [
  //   { data: [], label: '今日单量' },
  //   { data: [], label: '昨日单量' },
  // ];

  // public barChartColors: Array<any> = [
  //   { // orange
  //     backgroundColor: 'rgba(255,165,0,0.8)',
  //     borderColor: 'rgba(255,165,0,1)',
  //     pointBackgroundColor: 'rgba(255,165,0,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(255,165,0,0.8)',
  //     textColor:'#fff'
  //   },
  //   { // green
  //     backgroundColor: 'rgba(0,165,0,0.8)',
  //     borderColor: 'rgba(0,165,0,1)',
  //     pointBackgroundColor: 'rgba(0,165,0,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(0,165,0,0.8)'
  //   },
  // ];
}
