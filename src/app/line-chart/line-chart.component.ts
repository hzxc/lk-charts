import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { Console } from '@angular/core/src/console';
import { OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import * as  echarts from 'echarts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit{
  provinceArray = [
    '安徽', '北京', '重庆', '福建', '甘肃',
    '广东', '广西', '贵州', '海南', '河北',
    '黑龙江', '河南', '湖北', '湖南', '云南',
    '浙江', '江苏', '江西', '吉林', '辽宁',
    '宁夏', '青海', '山东', '上海',
    '山西', '陕西', '四川', '天津', '台湾',
    '新疆', '西藏', '内蒙古'
  ];

  @Input()
  multiple;

  provinceOrder = [];
  option;
  timer;

  private myChart;


  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit(): void {
    this.myChart = echarts.init(document.getElementById('main'));
    this.getRandByProvince();
    // this.getOrderByProvince();

    this.timer = setInterval(() => {
      // this.getOrderByProvince();
    this.getRandByProvince();
    }, 1000 * 60 * 5)
  }

  getRandByProvince(){
    for(let i=0;i<this.provinceArray.length;i++){
      this.provinceOrder.push(
      {'name':this.provinceArray[i],'value':this._OrderServesService.getRand()*123}
      )
    }
    this.chartsOnit();
    this.myChart.setOption(this.option);
  }

  getOrderByProvince() {
    this.provinceOrder = [];
    var data = [];
    this._OrderServesService
      .GetEachProvinceOrderAmount(this._OrderServesService.rCreateTime(), 'lk01')
      .subscribe((province) => {
        let t1 = province['result']
        this._OrderServesService
          .GetEachProvinceOrderAmount(this._OrderServesService.rCreateTime(), 'lk02')
          .subscribe((province) => {
            let t2 = province['result']

            for (let j = 0; j < t1.length; j++) {
              this.provinceOrder.push({ name: (t1[j]['province']), value: ((t1[j]['amount'])+t2[j]['amount'] )* this.multiple });
            }
            // console.log(this.provinceOrder);
            this.chartsOnit();
            this.myChart.setOption(this.option);
          })
      })


  }

  chartsOnit() {
    var n = this.multiple;
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    };

    //维度值
    var geoCoordMap = {
      '重庆': [106.54, 29.59],
      '北京': [116.46, 39.92],
      '天津': [117.2, 39.13],
      '安徽': [117.27, 31.86],
      '福建': [119.3, 26.08],
      '甘肃': [103.73, 36.03],
      '广东': [113.23, 23.16],
      '广西': [108.33, 22.84],
      '贵州': [106.71, 26.57],
      '海南': [110.35, 20.02],
      '河北': [114.48, 38.03],
      '黑龙江': [126.63, 45.75],
      '河南': [113.65, 34.76],
      '湖北': [114.31, 30.52],
      '湖南': [113, 28.21],
      '云南': [102.73, 25.04],
      '浙江': [120.19, 30.26],
      '江苏': [118.78, 32.04],
      '江西': [115.89, 28.68],
      '吉林': [125.35, 43.88],
      '辽宁': [123.38, 41.8],
      '宁夏': [106.27, 38.47],
      '青海': [101.74, 36.56],
      '山东': [117, 36.6],
      '上海': [121.48, 31.22],
      '山西': [112.53, 37.87],
      '陕西': [108.95, 34.27],
      '四川': [104.06, 30.67],
      '台湾': [121.5, 25.14],
      '新疆': [87.68, 43.77],
      '西藏': [91.11, 29.97],
      '内蒙古': [111.65, 40.82],
      '兰考': [114.385481, 34.825227],
    };

    //连线
    var dataFrom = '重庆';
    var lineData = convertData(this.provinceOrder.sort(function (a, b) {
      return b.value - a.value;
    }).slice(0, 7));


    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}'
      },
      legend: {
        orient: 'horizontal',
        top: '3%',
        left: '6%',
        data: ['区域前七', '分布区域'],
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '分布区域',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(this.provinceOrder),
          symbolSize: 4,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              fontSize: 9
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#05C3F9'
            }
          }
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          roam: true,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          animation: false,
          data: this.provinceOrder
        },
        {
          name: '区域前七',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(this.provinceOrder.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 7)),
          symbolSize: function (val) {
            return (val[2] / (10 * 18 * n));
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              fontSize: 9
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              shadowBlur: 10,
              shadowColor: 'yellow'
            }
          },
          zlevel: 1
        },

        //
        {
          name: '重庆', //动线
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 5
          },
          lineStyle: {
            normal: {
              color: '#07A6FF',
              width: 0,
              curveness: 0.2
            }
          },
          data: lineData.map(function (dataItem) {
            return {
              fromName: dataFrom,
              toName: dataItem.name,
              coords: [
                geoCoordMap[dataFrom],
                geoCoordMap[dataItem.name]
              ]
            }
          })
        },
        {
          name: '重庆', //单线
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,

          },
          lineStyle: {
            normal: {
              color: '#07A6FF',
              width: .9,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: lineData.map(function (dataItem) {
            return {
              fromName: dataFrom,
              toName: dataItem.name,
              coords: [
                geoCoordMap[dataFrom],
                geoCoordMap[dataItem.name]
              ]
            }
          })
        },
        {
          name: '重庆',  //圆圈
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: ''
            }
          },
          symbolSize: function (val) {
            return val[2] / 7;
          },
          itemStyle: {
            normal: {
              color: '#07A6FF'
            }
          },
          data: lineData.map(function (dataItem) {
            return {
              name: dataItem.name,
              value: geoCoordMap[dataItem.name].concat([dataItem.value])
            };
          })
        }

      ],

      geo: {
        show: true,
        map: 'china',
        roam: true,
        itemStyle: {
          normal: {
            areaColor: 'rgba(0, 0, 0, 0)',
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'white' // 0% 处的颜色
              }, {
                offset: 1, color: 'yellow' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            shadowColor: 'rgba(0,0,0, 1)',
            shadowBlur: 15,
          },
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 20,
          emphasis: {
            areaColor: 'rgba(255,255,255,.3)'
          }
        },
        zoom: 1.25//当前视角的缩放比例
      },

      // markPoint: {
      //   symbol: 'circle',
      //   symbolSize: 50
      // },
    };
  }


  compare(prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}
