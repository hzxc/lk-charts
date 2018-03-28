import { Component, ViewEncapsulation } from '@angular/core';
import { FloatingActionButton } from 'ng2-floating-action-menu';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OrderServesService } from './shared/order-serves.service';
declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {

  public multiple = 1;  //修改整体数据，默认为1，值为倍数

  private now;
  private clientHeight;
  private spinnerDiameter: number;
  private orderTotal: number;
  private ownerTotal: number;
  private stateArray = [];
  private ownerOrder = [];
  private fiveOwnerOrder = [];

  private timer;
  private timer1;

  constructor(
    private _OrderServesService: OrderServesService
  ) {
    this.clientHeight = window.screen.height;
  }

  ngOnInit(): void {
    this.getHeight();
    this.getOrderTotal();
    this.getTotalOwner();
    this.getState();
    this.getOrderByOwner();

    this.timer = setInterval(() => {
      this.getNow();
    }, 1000);

    this.timer1 = setInterval(() => {
      this.getOrderTotal();
      this.getTotalOwner();
      this.getState();
      this.getOrderByOwner();
    }, 1000 * 60 * 30);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  }

  getNow() {
    let l = ["日", "一", "二", "三", "四", "五", "六"];
    let Now = new Date();
    this.now = Now.getFullYear() + '年' + (Now.getMonth() + 1) + '月' + Now.getDate() + '日   '
      + Now.getHours() + '时' + Now.getMinutes() + '分' + Now.getSeconds() + '秒    ';
    this.now += "星期" + l[Now.getDay()];
  }
  getHeight() {
    let header = document.getElementById('header');
    let body = document.getElementById('body');
    let foot = document.getElementById('foot');
    let logo = document.getElementById('logo');
    logo.style.height = this.clientHeight * .09 + 'px';
    header.style.height = this.clientHeight * .1 + 'px';
    body.style.height = this.clientHeight * .59 + 'px';
    foot.style.height = this.clientHeight * .29 + 'px';
    this.spinnerDiameter = parseInt(this.clientHeight / 12 + '');
  }
  getOrderTotal() {
    this._OrderServesService
      .getOrders('', 0, 0, "", "", " ", "", "", "", "", "", "")
      .subscribe((res) => {
        var length = 0;
        for (let i in res) {
          length++;
        }
        this.orderTotal = length * this.multiple;
      })
  }
  getTotalOwner() {
    this._OrderServesService
      .getOwners()
      .subscribe((res) => {
        let length = 0;
        for (let i in res) {
          length++;
        }
        this.ownerTotal = length;
      })
  }
  getState() {
    this.stateArray=[];
    // 已发运
    this._OrderServesService
      .getOrders('', 0, 900, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.stateArray.push({ 'name': '已发运', total: length * this.multiple });
      })
    // 待复核
    this._OrderServesService
      .getOrders('', 0, 700, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.stateArray.push({ 'name': '待复核', total: length * this.multiple });
      })
    // 待拣货
    this._OrderServesService
      .getOrders('', 0, 300, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.stateArray.push({ 'name': '待拣货', total: length * this.multiple });
      })

    // 订单池
    this._OrderServesService
      .getOrders('', 0, 100, "", "", " ", "", "", "", "", "", "")
      .subscribe((result) => {
        var length = 0;
        for (let j in result) {
          length++;
        }
        this.stateArray.push({ 'name': '订单池', total: length * this.multiple });
      })
  }
  getOrderByOwner() {
    this.ownerOrder=[];
    this.fiveOwnerOrder=[]
    this._OrderServesService
      .getOwners()
      .subscribe((result) => {
        for (let i in result) {
          for (let j in result[i]) {
            this._OrderServesService
              .getOrders(result[i][j], 0, 0, "", '', " ", "", "", "", "", "", "")
              .subscribe((res) => {
                let length = 0;
                for (let k in res)
                  length++;
                this.ownerOrder.push({ 'name': result[i][j], 'total': length * this.multiple })
                this.ownerOrder.sort(this.sortTotal);
                this.fiveOwnerOrder = this.ownerOrder.concat();
                this.fiveOwnerOrder.splice(6);
              })
          }
        }
      })
  }

  sortTotal(a, b) {
    return b.total - a.total
  }

}
