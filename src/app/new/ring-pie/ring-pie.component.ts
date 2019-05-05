import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-ring-pie',
  templateUrl: './ring-pie.component.html',
  styleUrls: ['./ring-pie.component.css']
})
export class RingPieComponent implements OnInit {

   option;

  constructor() { }

  ngOnInit() {
    this.chartInit();
    // $('#star').raty({ score: 3 });
  }

  chartInit() {
    var dataStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
      }
    };
    var placeHolderStyle = {
      normal: {
        color: 'rgba(44,59,70,1)',//未完成的圆环的颜色
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
      }
    };

    this.option = {
      title: {
        text: '75%',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: "#0bb6f0",
          fontSize: 12
        }
      },
      color: ['#eb644b', '#313443', '#fff'],
      tooltip: {
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: false,
        itemGap: 12,
        data: ['01', '02']
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      series: [
        {
          name: 'Line 1',
          type: 'pie',
          clockWise: false,
          radius: ['27%', '30%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              shadowBlur: 40,
              shadowColor: 'rgba(40, 40, 40, 0.5)',
            }
          },
          hoverAnimation: false,
          data: [{
            value: 75,
            name: '01'
          },
          {
            value: 25,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: 'rgba(44,59,70,1)',//未完成的圆环的颜色
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
              }
            }
          }]
        },
        {
          name: 'Line 2',
          type: 'pie',
          animation: false,
          clockWise: false,
          radius: ['32%', '35%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              shadowBlur: 40,
              shadowColor: 'rgba(40, 40, 40, 0.5)',
            }
          },
          hoverAnimation: false,
          tooltip: {
            show: false
          },
          data: [{
            value: 100,
            name: '02',
            itemStyle: {
              emphasis: {
                color: '#313443'
              }
            }
          }, {
            value: 0,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: 'rgba(44,59,70,1)',//未完成的圆环的颜色
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: 'rgba(44,59,70,1)'//未完成的圆环的颜色
              }
            }
          }
          ]
        },


      ]
    };
  };
}

