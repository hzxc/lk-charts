import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as  echarts from 'echarts';

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {


    @Input()
    multiple;

    option;
    ulArray = [];
    timer;

    myChart;
    //optionData
    bar1 = [];
    finish = [];
    nameArray = [];


    constructor(
        private _OrderServesService: OrderServesService
    ) {
        this._OrderServesService
            .GetOwnerCodesByWarehouseCode('lk01')
            .subscribe((r) => {
                for (let j in r['result']) {
                    this._OrderServesService
                        .GetGroupByOwnerCode(r['result'][j]['code'])
                        .subscribe((res) => {
                            if (res['result'] != null) {
                                this.nameArray.push(res['result']['ownerGroup']['groupName']);
                                this.nameArray = this._OrderServesService.unique(this.nameArray).concat();

                            }
                        })
                }
            })
        this._OrderServesService
            .GetOwnerCodesByWarehouseCode('lk02')
            .subscribe((r) => {
                for (let j in r['result']) {
                    this._OrderServesService
                        .GetGroupByOwnerCode(r['result'][j]['code'])
                        .subscribe((res) => {
                            if (res['result'] != null) {
                                this.nameArray.push(res['result']['ownerGroup']['groupName']);
                                this.nameArray = this._OrderServesService.unique(this.nameArray).concat();
                            }
                        })
                }
            })

    }

    ngOnInit() {
        this.myChart = echarts.init(document.getElementById('gruop'));
        // this.get();
        this.getRandGroup();

        this.timer = setInterval(() => {
            // this.get();
            this.getRandGroup();
        }, 1000 * 60 * 5)

    }

    getRandGroup() {
        let ul = [];
        let groupArray = ['文具组', '服装百货组', '食品组', '玩具百货组', '饰品组', '标准仓'];
        this.nameArray = groupArray.concat();
        for (let i = 0; i < groupArray.length; i++) {
            let s = this._OrderServesService.getRand() * 10
            ul.push(
                {
                    'name': groupArray[i],
                    'total': s,
                    'finish': this._OrderServesService.getRand()
                }),
                this.bar1[i] = s;
        }
        ul.sort(this.sortTotal);
        this.ulArray = ul;
        this.chartsInit();
        this.myChart.setOption(this.option);
    }

    get() {
        for (let j = 0; j <= 5; j++) {
            this.bar1[j] = 0;
            this.finish[j] = 0;
        }
        this._OrderServesService
            .GetEachOwnerAndStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk01')
            .subscribe((r1) => {
                this.group(r1['result']);
            })
        this._OrderServesService
            .GetEachOwnerAndStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk02')
            .subscribe((r2) => {
                this.group(r2['result']);
            })
    }

    group(orders) {
        for (let j in orders) {
            this._OrderServesService
                .GetGroupByOwnerCode(orders[j]['ownerCode'])
                .subscribe((res) => {
                    if (res['result'] != null) {
                        orders[j]['groupName'] = res['result']['ownerGroup']['groupName'];
                        for (let i = 0; i <= this.nameArray.length; i++) {
                            if (res['result']['ownerGroup']['groupName'] == this.nameArray[i]) {
                                this.bar1[i] += orders[j]['amount'];
                                if (orders[j]['orderStatusList'].length > 0) {
                                    this.finish[i] += orders[j]['orderStatusList'][0]['count'];
                                }
                            }
                        }
                    }

                    let ul = [];

                    for (let z = 0; z < this.bar1.length; z++) {
                        ul.push({ 'name': this.nameArray[z], 'total': this.bar1[z] * this.multiple, 'finish': this.finish[z] * this.multiple })
                    }
                    ul.sort(this.sortTotal);
                    this.ulArray = ul;
                    this.chartsInit();
                    this.myChart.setOption(this.option);
                })
        }

    }

    sortTotal(a, b) {
        return b.total - a.total
    }

    chartsInit() {
        this.option = {
            // backgroundColor: 'green',
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255,255,255,0.8)',
                extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                textStyle: {
                    color: '#666',
                },
                formatter: "{a} <br/>{b} : {c}"
            },
            calculable: true,
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    //起始角度，支持范围[0, 360]
                    startAngle: 180,
                    //饼图的半径，数组的第一项是内半径，第二项是外半径
                    radius: [50, 100],
                    //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                    center: ['50%', '85%'],
                    //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                    // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                    //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                    roseType: 'area',
                    //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            fontSize: 9
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length2: 0.2,

                        },
                        emphasis: {
                            // show: true
                        }
                    },
                    data: [{
                        value: this.bar1[0],
                        name: this.nameArray[0],
                        itemStyle: {
                            normal: {
                                color: '#229aff'
                            }
                        }
                    },
                    {
                        value: this.bar1[1],
                        name: this.nameArray[1],
                        itemStyle: {
                            normal: {
                                color: '#fdb94e'
                            }
                        }
                    },
                    {
                        value: this.bar1[2],
                        name: this.nameArray[2],
                        itemStyle: {
                            normal: {
                                color: '#30d6a9'
                            }
                        }
                    },
                    {
                        value: this.bar1[3],
                        name: this.nameArray[3],
                        itemStyle: {
                            normal: {
                                color: '#F87B5F'
                            }
                        }
                    },
                    {
                        value: this.bar1[4],
                        name: this.nameArray[4],
                        itemStyle: {
                            normal: {
                                color: '#28a0dc'
                            }
                        }
                    },
                    {
                        value: this.bar1[5],
                        name: this.nameArray[5],
                        itemStyle: {
                            normal: {
                                color: '#f08c64'
                            }
                        }
                    },

                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: 0,
                        name: "",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                    ]
                }]
        };
    };
}
