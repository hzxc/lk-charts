import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderServesService {

  private orderUrl = 'http://10.10.10.100:9001/api';
  private options_: any = {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getOrders(
    Company: string,
    LeadingSts: number,
    TrailingSts: number,
    ShipmentType: string,
    ShipToState: string,
    ActualShipDateTime: string,
    Carrier: string,
    UserDef8: string,
    ProcessType: string,
    ShipmentCategory6: string,
    CreateDateTime: string,
    CreateUser: string,
    EndDateTime: string
  ): Observable<Response> {
    try {
      let url_ = this.orderUrl + "/DeliveryOrder/GetDeliveryOrders?";
      url_ += "company=" + encodeURIComponent("" + Company) + "&";
      url_ += "leadingSts=" + encodeURIComponent("" + LeadingSts) + "&";
      url_ += "trailingSts=" + encodeURIComponent("" + TrailingSts) + "&";
      url_ += "shipmentType=" + encodeURIComponent(ShipmentType) + "&";
      url_ += "shipToState=" + encodeURIComponent("" + ShipToState) + "&";
      url_ += "actualShipDateTime=" + encodeURIComponent("" + ActualShipDateTime) + "&";
      url_ += "carrier=" + encodeURIComponent("" + Carrier) + "&";
      url_ += "userDef8=" + encodeURIComponent("" + UserDef8) + "&";
      url_ += "processType=" + encodeURIComponent("" + ProcessType) + "&";
      url_ += "shipmentCategory6=" + encodeURIComponent("" + ShipmentCategory6) + "&";
      url_ += "createDateTime=" + encodeURIComponent("" + CreateDateTime) + "&";
      url_ += "createUser=" + encodeURIComponent("" + CreateUser) + "&";
      url_ += "endDateTime=" + encodeURIComponent("" + EndDateTime) + "&";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_, this.options_)
        .map((response: any) => { return response; })
    } catch (e) {
      return <any>Observable.throw(e);
    }

  }

  getOwners(): Observable<Response> {
    let url_ = this.orderUrl + 　"/Owner/getOwners";

    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '-' + month + '-' + (day - 1) + " 16:00:00";
  }

  //去掉数组重复值
  unique(arr) {
    var len = arr.length;
    var result = []
    for (var i = 0; i < len; i++) {
      var flag = true;
      for (var j = i; j < arr.length - 1; j++) {
        if (arr[i] == arr[j + 1]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        result.push(arr[i])
      }
    }
    return result;
  }
}