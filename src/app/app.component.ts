import { Component, ViewEncapsulation } from '@angular/core';
import { FloatingActionButton } from 'ng2-floating-action-menu';
import { OnInit, OnDestroy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OrderServesService } from './shared/order-serves.service';
// import * as $ from'../assets/vsreen/jquery-1.7.1.min.js';
import * as $ from 'jquery';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import * as z from '../assets/vsreen/demo.js'
// import {
//   WebVideoCtrl,
//   webVideoCtrl,

// } from '../assets/vsreen/webVideoCtrl.js'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    '../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  public multiple = 1;  //修改整体数据，默认为1，值为倍数

   now;
   clientHeight;
   orderTotal: number = 0;
   stateArray = [];
   orders01;
   orders02;
   ordersNewSystem01;
   ordersNewSystem02;

   countArray = [];
   timer;

  constructor(
    private _OrderServesService: OrderServesService,
    private router: Router,
    private activateInfo: ActivatedRoute
  ) {
    this.clientHeight = window.screen.height;
  }

  ngOnInit(): void {
    this.activateInfo.queryParams.subscribe(queryParams => {
      if (queryParams.id != undefined) {
        let mul = queryParams.id;
        this.multiple = mul
      }

    })

    this.getHeight();
    // this.getOrderTotal();
    this.getRandState()

    this.timer = setInterval(() => {
      // this.getOrderTotal();
      this.getRandState

    }, 1000 * 60 * 5)

  }


  getNow() {
    let l = ["日", "一", "二", "三", "四", "五", "六"];
    let Now = new Date();
    this.now = Now.getFullYear() + '/' + (Now.getMonth() + 1) + '/' + Now.getDate() + '/   '
      + [(Now.getHours() < 10) ? '0' + Now.getHours() : Now.getHours()] + ':'
      + [(Now.getMinutes() < 10) ? '0' + Now.getMinutes() : Now.getMinutes()] + ':'
      + [(Now.getSeconds() < 10) ? '0' + Now.getSeconds() : Now.getSeconds()] + '    ';
    this.now += "星期" + l[Now.getDay()];
  }
  getHeight() {
    let header = document.getElementById('head');
    let body = document.getElementById('body');
    let foot = document.getElementById('foot');
    header.style.height = this.clientHeight * .06 + 'px';
    body.style.height = this.clientHeight * .67 + 'px';
    foot.style.height = this.clientHeight * .25 + 'px';
  }

  getOrderTotal() {
    let mind = [];
    var yestoday = '2018-12-17 09:10:00';
    this._OrderServesService
      .GetEachStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk01')
      .subscribe((r1) => {
        mind = r1['result']
        this._OrderServesService
          .GetEachStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk02')
          .subscribe((r2) => {
            for (let i = 0; i < 9; i++) {
              mind[i]['amount'] += r2['result'][i]['amount'];
            }
            this.countArray = mind.concat();
            this.getState();
          })

      });


  }
  getRandState(){
    this.orderTotal=this._OrderServesService.getRand()*239;
    this.stateArray[0]=this._OrderServesService.getRand()*239;
    this.stateArray[1]=this._OrderServesService.getRand()*239;
    this.stateArray[2]=this._OrderServesService.getRand()*239;
  }
  getState() {
    this.stateArray = []; this.orderTotal = 0;
    let send = 0, jianhuo = 0, pool = 0;
    for (let i = 0; i < this.countArray.length; i++) {
      this.orderTotal += this.countArray[i]['amount'];
      if (i == 0) {
        pool += this.countArray[i]['amount'];
      }
      if (i > 0 && i < 6) {
        jianhuo += this.countArray[i]['amount'];
      }
      if (i >= 6) {
        send += this.countArray[i]['amount'];
      }
    }
    this.orderTotal *= this.multiple;
    this.stateArray[0] = send * this.multiple;
    this.stateArray[1] = jianhuo * this.multiple;
    this.stateArray[2] = pool * this.multiple;
  }

  sortTotal(a, b) {
    return b.total - a.total
  }
}
