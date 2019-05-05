import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { Input } from '@angular/core';
import * as  echarts from 'echarts';

// import 'highcharts/adapters/standalone-framework.src';
// const Highcharts = require('highcharts/highcharts.src');

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.css']
})
export class areaListComponent implements OnInit, OnDestroy {


    @Input()
     send;
    @Input()
     poll;

     timer;
     option;

    constructor(
        private _OrderServesService: OrderServesService
    ) { }

    ngOnInit(): void {
        var myChart = echarts.init(document.getElementById('ring'));
        var timer1 = setInterval(() => {
            if (this.send != undefined && this.poll != undefined) {
              this.chartsInit();           
              clearInterval(timer1);
      
              this.timer = setInterval(() => {
                this.chartsInit(); 
      
              }, 1000 * 60 * 5)
            }
          }, 500)
    }
    ngOnDestroy(): void {
        clearInterval(this.timer);
    }

    chartsInit() {
        this.option = {
            title: [
                {
                    text: '已发货',
                    left: '23%',
                    top: '2%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#fff',
                        fontSize: 15,
                        textAlign: 'center',
                    }
                },
                {
                    text: (this.send/(this.send+this.poll)*100).toFixed(0)+"%",
                    left: '22%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#fff',
                        fontSize: 16,
                        textAlign: 'center',
                    }
                },
                {
                    text: '未发货',
                    left: '66%',
                    top: '2%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#fff',
                        fontSize: 15,
                        textAlign: 'center',
                    }
                },
                {
                    text: (this.poll/(this.send+this.poll)*100).toFixed(0)+"%",
                    left: '67%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#fff',
                        fontSize: 15,
                        textAlign: 'center',
                    }
                }],
            series: [
                {
                    type: 'liquidFill',
                    // data: [0.6, 0.5, 0.4, 0.3],
                    data: [(this.send/(this.send+this.poll)).toFixed(1)],
                    direction: 'right', //波浪方向或者静止
                    radius: '45%',
                    // 水球颜色
                    color: ['#00c2ff'],
                    center: ['25%', '45%'], //水球位置
                    // outline  外边
                    outline: {
                        // show: false
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 2, //圆边线宽度
                            borderColor: '#00c2ff',
                        },
                    },
                    label: {
                        normal: {
                            formatter: (this.send/(this.send+this.poll)*100).toFixed(0)+"%", //重置百分比字体为空
                            // textStyle: {
                            color: 'white',
                            insideColor: 'yellow',
                            fontSize: 10
                            // }
                        }
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(4,24,74,0.8)',
                        // borderWidth: 5,
                        // borderColor: 'red',
                    }
                },
                {
                    type: 'liquidFill',
                    data: [ (this.poll/(this.send+this.poll)).toFixed(1)],
                    direction: 'right', //波浪方向或者静止
                    radius: '45%',
                    // 水球颜色
                    color: ['#ffd97a'],
                    center: ['67%', '45%'], //水球位置
                    // outline  外边
                    outline: {
                        // show: false
                        borderDistance: 0, //内环padding值
                        itemStyle: {
                            borderWidth: 2, //圆边线宽度
                            borderColor: '#ffd97a',
                        },
                    },
                    label: {
                        normal: {
                            formatter: (this.poll/(this.send+this.poll)*100).toFixed(0)+"%", //重置百分比字体为空
                            // textStyle: {
                            color: 'white',
                            insideColor: 'yellow',
                            fontSize: 10
                            // }
                        }
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(4,24,74,0.8)',
                        // borderWidth: 5,
                        // borderColor: 'red',
                    }
                }]
        };
    }

}
