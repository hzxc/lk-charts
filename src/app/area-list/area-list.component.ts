import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderServesService } from '../shared/order-serves.service';
import { Input } from '@angular/core';

// import 'highcharts/adapters/standalone-framework.src';
// const Highcharts = require('highcharts/highcharts.src');

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.css']
})
export class areaListComponent implements OnInit, OnDestroy {


    private provinceArray = [
        '安徽省', '北京市', '重庆市', '福建省', '甘肃省',
        '广东省', '广西省', '贵州省', '海南省', '河北省',
        '黑龙江省', '河南省', '湖北省', '湖南省', '云南省',
        '浙江省', '江苏省', '江西省', '吉林省', '辽宁省',
        '内蒙古', '宁夏', '青海', '山东省', '上海市',
        '山西省', '陕西省', '四川省', '天津市','台湾省',
        '新疆维吾尔自治区', '西藏自治区'
    ];

    private ownerOrder = [];
    private fiveOwnerOrder = [];

    @Input()
    private orderTotal;
    @Input()
    private multiple;

    private timer;

    constructor(
        private _OrderServesService: OrderServesService
    ) { }

    ngOnInit(): void {
        // this.getOrderByProvince();
        // this.timer = setInterval(() => {
        //     this.getOrderByProvince();
        // }, 1000 * 60 * 30)
    }
    ngOnDestroy(): void {
        clearInterval(this.timer);
    }
    // getOrderByProvince() {
    //     this.ownerOrder = [];
    //     this.fiveOwnerOrder = [];
    //     var yestoday=this._OrderServesService.formatTime(new Date());
    //     for (let i = 0; i < this.provinceArray.length; i++) {
    //         this._OrderServesService
    //             .getOrders('', 0, 0, "", this.provinceArray[i], " ", "", "", "", "", yestoday, "","")
    //             .subscribe((res) => {
    //                 var length = 0;
    //                 for (let j in res) {
    //                     length++;
    //                 }
    //                 if (length > 0)
    //                     this.ownerOrder.push({ 'name': this.provinceArray[i], 'total': length * this.multiple })
    //                 this.ownerOrder.sort(this.sortTotal);
    //                 this.fiveOwnerOrder = this.ownerOrder.concat();
    //                 this.fiveOwnerOrder.splice(6);
    //             })
    //     }
    // }

    sortTotal(a, b) {
        return b.total - a.total
    }

}
