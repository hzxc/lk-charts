import { Component, OnInit, Input } from '@angular/core';
import * as  echarts from 'echarts';
import { OrderServesService } from '../../shared/order-serves.service';

@Component({
  selector: 'app-bar-multi',
  templateUrl: './bar-multi.component.html',
  styleUrls: ['./bar-multi.component.css']
})
export class BarMultiComponent implements OnInit {

  @Input()
   multiple;
   optionBar;

   timer
   threeOrders01 = [];
   threeOrders02 = [];

   download01 = [];
   product01 = [];
   download02 = [];
   product02 = [];

   hours: number;


  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    // this.orderType();
    this.RandOrderType();


    this.timer = setInterval(() => {
      // this.orderType();
      this.RandOrderType();
    }, 1000 * 60 * 30)

  }

  RandOrderType(){
    this.product01=[
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
    ]
    this.product02=[
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
      this._OrderServesService.getRand()*10,
    ]
    this.download01=[
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
    ]
    this.download02=[
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
      this._OrderServesService.getRand()*100,
    ]
    this.chartsInit();

  }


  orderType() {
    let timeArray = [];
    this.download01 = [];
    this.product01 = [];
    this.download02 = [];
    this.product02 = [];
    let today = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + "-" + new Date().getDate();
    let hours = new Date().getHours();
    for (let i = 0; i < hours; i++) {
      timeArray.push({ start: today + " " + i + ":00:00", end: today + " " + (i + 1) + ":00:00" })
    }
    // console.log(timeArray);
    for (let i = 0; i < timeArray.length; i++) {
      //生产量01
      this._OrderServesService
        .GetPackageAmount(timeArray[i]['start'], timeArray[i]['end'], 'lk01', true)
        .subscribe((r11) => {
          this._OrderServesService
            .GetPackageAmount(timeArray[i]['start'], timeArray[i]['end'], 'lk01', false)
            .subscribe((r12) => {
              this.product01[i] = (r11['result']['amount'] + r12['result']['amount']) * this.multiple;
              //显示图表  
              this.hours = this.download01.length;
              this.chartsInit();
              // this.optionBar.series[0].data = download01.concat();
              // this.optionBar.series[1].data = product01.concat();
              // this.optionBar.series[2].data = download02.concat();
              // this.optionBar.series[3].data = product02.concat();
              // for (let i = 0; i < download01.length; i++) {
              //   this.threeOrders01[i] = { 'name': i + "-" + (i + 1), 'download': download01[i], 'product': product01[i] }
              //   this.threeOrders02[i] = { 'name': i + "-" + (i + 1), 'download': download02[i], 'product': product02[i] }
              // }
              this.threeOrders01.sort(this.sortTotal);
              this.threeOrders01.splice(3)
              this.threeOrders02.sort(this.sortTotal);
              this.threeOrders02.splice(3)

            })
        })
      //生产量02
      this._OrderServesService
        .GetPackageAmount(timeArray[i]['start'], timeArray[i]['end'], 'lk02', true)
        .subscribe((r21) => {
          this._OrderServesService
            .GetPackageAmount(timeArray[i]['start'], timeArray[i]['end'], 'lk02', false)
            .subscribe((r22) => {
              this.product02[i] = (r21['result']['amount'] + r22['result']['amount']) * this.multiple;


            })
        })
      //下发量01
      this._OrderServesService
        .GetOrderAmountByCreateTime(timeArray[i]['start'], timeArray[i]['end'], 'lk01')
        .subscribe((z1) => {
          this.download01[i] = z1['result']['amount'] * this.multiple;
        })
      //下发量02
      this._OrderServesService
        .GetOrderAmountByCreateTime(timeArray[i]['start'], timeArray[i]['end'], 'lk02')
        .subscribe((z2) => {
          this.download02[i] = z2['result']['amount'] * this.multiple;
        })
    }
  }


  sortTotal(a, b) {
    return b.product - a.product
  }


  chartsInit() {
    let xData = [
      "0:00", "1:00", "2:00", "3:00", "4:00", "5:00",
      "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
      "19:00", "20:00", "21:00", "22:00", "23:00"
    ]
    this.optionBar = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: "10%",
        left: '10%',
        right: '0',
        bottom: '23%'
      },
      legend: {
        right: 20,
        textStyle: {
          color: '#7D838B',
          fontSize: 9
        },
        data: ['1仓下发量', '2仓下发量', '1仓产量', '2仓产量']
      },
      color: ['#00B9F4', '#946C03', '#64F393', '#880015'],
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#7D838B'
        },
        splitLine: false,
        data: xData.splice(0, this.hours)
      },
      yAxis: {
        type: 'value',
        // min:-35,
        axisLabel: {
          formatter: '{value}',
          color: '#7D838B'
        },
        splitLine: false,
      },
      series: [
        {
          name: '1仓下发量',
          type: 'line',
          data: this.download01.concat(),
        },
        {
          name: '1仓产量',
          type: 'line',
          data: this.product01.concat(),
          markPoint: {
            label: {
              show: true,
              formatter: '{c}',
              color: 'white'
            },
            data: [
              { type: 'max', name: '最大值' },
              { coord: [41, 15], name: '15', value: 15 }
            ]
          },
        },
        {
          name: '2仓下发量',
          type: 'line',
          data: this.download02.concat(),
        },
        {
          name: '2仓产量',
          type: 'line',
          data: this.product02.concat(),
          markPoint: {
            label: {
              show: true,
              formatter: '{c}',
              color: 'white'
            },
            data: [
              { type: 'max', name: '最大值' },
              { coord: [41, 15], name: '15', value: 15 }
            ]
          },
        }
      ]
    };
  }

}
