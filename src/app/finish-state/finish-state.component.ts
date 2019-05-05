import { Component, OnInit, Input } from '@angular/core';
import { OrderServesService } from '../shared/order-serves.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-finish-state',
  templateUrl: './finish-state.component.html',
  styleUrls: ['./finish-state.component.css']
})
export class FinishStateComponent implements OnInit, OnDestroy {


   sendOrder01 = [];
   sendOrder02 = [];
   fiveSendOrder = []

  @Input()
   multiple;

   timer;
   owners01 = [];
   owners02;

   empty = [1, 1, 1]
   shiji = [1, 1, 1, 1, 1, 1, 1]
  constructor(
    private _OrderServesService: OrderServesService
  ) { }

  ngOnInit() {
    var timer1;
    // this.getOwners();
    this.getRandOwners();

    clearInterval(timer1);
    this.timer = setInterval(() => {
      this.getRandOwners();
    }, 1000 * 60 * 5)




  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  getRandOwners(){
    for(let i=0;i<5;i++){
      this.fiveSendOrder.push({
          ownerCode: "LK02DKA", 
          amount: 5945, 
          orderStatusList: [{trailingSts: "700+", count: 670}], 
          solid: ["1", "1", "1", "1", "1", "1"], 
          empty: ["1", "1", "1", "1"]
        })
      }
      this.fiveSendOrder.splice(5);
      this.oprateStar(this.fiveSendOrder);

  }

  getOwners() {
    let ors;
    this._OrderServesService
      .GetEachOwnerAndStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk01')
      .subscribe((res1) => {
        this._OrderServesService
          .GetEachOwnerAndStatusOrderAmount(this._OrderServesService.rCreateTime(), 'lk02')
          .subscribe((res2) => {
            ors = res1['result'];
            for (let o in res2['result']) {
              ors.push(res2['result'][o]);
            }
            ors.sort(this.sortTotal);
            this.fiveSendOrder = ors.concat()
            this.fiveSendOrder.splice(5);
            this.oprateStar(this.fiveSendOrder);
            console.log(this.fiveSendOrder);
          })
      })

  }
 

  sortTotal(a, b) {
    return b.amount - a.amount
  }
  oprateStar(dataArray) {
    let solid = 0, empty = 0;
    for (let i = 0; i < dataArray.length; i++) {
      solid = parseInt((((dataArray[i]['orderStatusList'][0]['count'] / dataArray[i].amount) * 100) / 10).toFixed(0));
      empty = 10 - solid;
      dataArray[i]['solid'] = this.initArray(solid);
      dataArray[i]['empty'] = this.initArray(empty);
      //商家不加倍
      if (dataArray[i]['name'] == '') {
        continue;
      }
      dataArray[i]['orderStatusList'][0]['count'] =  dataArray[i]['orderStatusList'][0]['count'] * this.multiple;
      dataArray[i]['amount'] = dataArray[i]['amount'] * this.multiple;

    }
    return dataArray
  }

  initArray(num) {
    let numberArray = [];
    for (let j = 0; j < num; j++) {
      numberArray.push('1');
    }
    return numberArray;
  }
  //保留长沙仓
  saveLKOwer(ownerArray) {
    let newArray = [];
    for (let i = 0; i < ownerArray.length; i++) {
      if (ownerArray[i]['warehouseCode'].indexOf('lk') >= 0) {
        newArray.push(ownerArray[i]);
      } else
        continue;
    }
    return newArray
  }
}
