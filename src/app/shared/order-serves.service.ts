import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MomentModule } from 'angular2-moment';
import { MatHeaderCell } from '@angular/material';

@Injectable()
export class OrderServesService {
  private lk1orderUrl = 'http://10.10.10.100:9001/api';
  private lk2OrderUrl = 'http://cainiao.linkong.vip:22743/api/services/app/Lk02OutboundOrderReportDatas';
  // private lk2OrderUrl = 'h://10.10.33.103:22742/api/services/app/Lk02OutboundOrderReportDatas';

  private createTime = "2019-2-28 16:00:00"
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

  getOrdersLk01(
    Company: string | null | undefined,
    LeadingSts: number | null | undefined,
    TrailingSts: number | null | undefined,
    ShipmentType: string | null | undefined,
    ShipToState: string | null | undefined,
    ActualShipDateTime: string | null | undefined,
    Carrier: string | null | undefined,
    UserDef8: string | null | undefined,
    ProcessType: string | null | undefined,
    ShipmentCategory6: string | null | undefined,
    CreateDateTime: string | null | undefined,
    CreateUser: string | null | undefined,
    EndDateTime: string | null | undefined,
    StartWithinLimitedHoursIsNotProduced: number | null | undefined,
    EndWithinLimitedHoursIsNotProduced: number | null | undefined
  ): Observable<Response> {
    try {
      let url_ = this.lk1orderUrl + "/DeliveryOrder/GetDeliveryOrders?";
      if (Company !== undefined)
        url_ += "company=" + encodeURIComponent("" + Company) + "&";
      if (LeadingSts !== undefined)
        url_ += "leadingSts=" + encodeURIComponent("" + LeadingSts) + "&";
      if (TrailingSts !== undefined)
        url_ += "trailingSts=" + encodeURIComponent("" + TrailingSts) + "&";
      if (ShipmentType !== undefined)
        url_ += "shipmentType=" + encodeURIComponent(ShipmentType) + "&";
      if (ShipToState !== undefined)
        url_ += "shipToState=" + encodeURIComponent("" + ShipToState) + "&";
      if (ActualShipDateTime !== undefined)
        url_ += "actualShipDateTime=" + encodeURIComponent("" + ActualShipDateTime) + "&";
      if (Carrier !== undefined)
        url_ += "carrier=" + encodeURIComponent("" + Carrier) + "&";
      if (UserDef8 !== undefined)
        url_ += "userDef8=" + encodeURIComponent("" + UserDef8) + "&";
      if (ProcessType !== undefined)
        url_ += "processType=" + encodeURIComponent("" + ProcessType) + "&";
      if (ShipmentCategory6 !== undefined)
        url_ += "shipmentCategory6=" + encodeURIComponent("" + ShipmentCategory6) + "&";
      if (CreateDateTime !== undefined)
        url_ += "createDateTime=" + encodeURIComponent("" + CreateDateTime) + "&";
      if (CreateUser !== undefined)
        url_ += "createUser=" + encodeURIComponent("" + CreateUser) + "&";
      if (EndDateTime !== undefined)
        url_ += "endDateTime=" + encodeURIComponent("" + EndDateTime) + "&";
      if (StartWithinLimitedHoursIsNotProduced !== undefined)
        url_ += "StartWithinLimitedHoursIsNotProduced=" + encodeURIComponent("" + StartWithinLimitedHoursIsNotProduced) + "&";
      if (EndWithinLimitedHoursIsNotProduced !== undefined)
        url_ += "EndWithinLimitedHoursIsNotProduced=" + encodeURIComponent("" + EndWithinLimitedHoursIsNotProduced) + "&";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_, this.options_)
        .map((any: any) => { return any; })
    } catch (e) {
      return <any>Observable.throw(e);
    }

  }

  getOwnersLk01(): Observable<Response> {
    let url_ = this.lk2OrderUrl + "/Owner/getOwners";

    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  getOrdersLk02(
    WarehouseCode: string | null | undefined,
    CompanyCode: number | null | undefined,
    Code: number | null | undefined,
    LeadingSts: number | null | undefined,
    TrailingSts: number | null | undefined,
    ShipmentType: string | null | undefined,
    ShipToCity: string | null | undefined,
    ShipToState: string | null | undefined,
    ProcessType: string | null | undefined,
    Created: string | null | undefined,
    ActualShipDateTime: string | null | undefined,
    CarrierCode: string | null | undefined,
    EndDateTime: string | null | undefined,
    StartWithinLimitedHoursIsNotProduced: number | null | undefined,
    EndWithinLimitedHoursIsNotProduced: number | null | undefined
  ): Observable<Response> {
    try {
      let url_ = this.lk2OrderUrl + "/GetOrders?";
      if (WarehouseCode !== undefined)
        url_ += "WarehouseCode=" + encodeURIComponent("" + WarehouseCode) + "&";
      if (CompanyCode !== undefined)
        url_ += "CompanyCode=" + encodeURIComponent("" + CompanyCode) + "&";
      if (Code !== undefined)
        url_ += "Code=" + encodeURIComponent("" + Code) + "&";
      if (LeadingSts !== undefined)
        url_ += "LeadingSts=" + encodeURIComponent("" + LeadingSts) + "&";
      if (TrailingSts !== undefined)
        url_ += "TrailingSts=" + encodeURIComponent("" + TrailingSts) + "&";
      if (ShipmentType !== undefined)
        url_ += "ShipmentType=" + encodeURIComponent("" + ShipmentType) + "&";
      if (ShipToCity !== undefined)
        url_ += "ShipToCity=" + encodeURIComponent("" + ShipToCity) + "&";
      if (ShipToState !== undefined)
        url_ += "ShipToState=" + encodeURIComponent("" + ShipToState) + "&";
      if (ProcessType !== undefined)
        url_ += "ProcessType=" + encodeURIComponent("" + ProcessType) + "&";
      if (Created !== undefined)
        url_ += "Created=" + encodeURIComponent("" + Created) + "&";
      if (ActualShipDateTime !== undefined)
        url_ += "ActualShipDateTime=" + encodeURIComponent("" + ActualShipDateTime) + "&";
      if (CarrierCode !== undefined)
        url_ += "CarrierCode=" + encodeURIComponent("" + CarrierCode) + "&";
      if (EndDateTime !== undefined)
        url_ += "EndDateTime=" + encodeURIComponent("" + EndDateTime) + "&";
      if (StartWithinLimitedHoursIsNotProduced !== undefined)
        url_ += "StartWithinLimitedHoursIsNotProduced=" + encodeURIComponent("" + StartWithinLimitedHoursIsNotProduced) + "&";
      if (EndWithinLimitedHoursIsNotProduced !== undefined)
        url_ += "EndWithinLimitedHoursIsNotProduced=" + encodeURIComponent("" + EndWithinLimitedHoursIsNotProduced) + "&";
      url_ = url_.replace(/[?&]$/, "");
      return this.http.get(url_, this.options_)
        .map((any: any) => { return any; })
    } catch (e) {
      return <any>Observable.throw(e);
    }
  }

  GetOwnerCodesByWarehouseCode(warehouseCode): Observable<Response> {
    let url_ = this.lk2OrderUrl + "/GetOwnerCodesByWarehouseCode?";
    url_ += "WarehouseCode=" + encodeURIComponent("" + warehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  //各状态总量
  GetEachStatusOrderAmount(orderCreatedTime, warehouseCode): Observable<Response> {
    let url_ = this.lk2OrderUrl + "/GetEachStatusOrderAmount?";
    url_ += "OrderCreatedTime=" + encodeURIComponent("" + orderCreatedTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + warehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  //根据省份
  GetEachProvinceOrderAmount(orderCreatedTime, warehouseCode) {
    let url_ = this.lk2OrderUrl + "/GetEachProvinceOrderAmount?";
    url_ += "OrderCreatedTime=" + encodeURIComponent("" + orderCreatedTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + warehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  //承运商总量
  GetEachCarrierOrderAmount(orderCreatedTime, warehouseCode) {
    let url_ = this.lk2OrderUrl + "/GetEachCarrierOrderAmount?";
    url_ += "OrderCreatedTime=" + encodeURIComponent("" + orderCreatedTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + warehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  //根据货主获得订单状态
  GetEachOwnerAndStatusOrderAmount(orderCreatedTime, warehouseCode) {
    let url_ = this.lk2OrderUrl + "/GetEachOwnerAndStatusOrderAmount?";
    url_ += "OrderCreatedTime=" + encodeURIComponent("" + orderCreatedTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + warehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })

  }
  //根据时间查询生产量
  GetPackageAmount(QueryStartTime, QueryEndTime, WarehouseCode, IsActive) {
    let url_ = this.lk2OrderUrl + "/GetPackageAmount?";
    url_ += "QueryStartTime=" + encodeURIComponent("" + QueryStartTime) + "&";
    url_ += "QueryEndTime=" + encodeURIComponent("" + QueryEndTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + WarehouseCode) + "&";
    url_ += "IsActive=" + encodeURIComponent("" + IsActive);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })

  }

  //根据重量传订单数
  GetOrderAmountByWeight(QueryStartTime, WarehouseCode, MinTotalWeight, MaxTotalWeight) {
    let url_ = this.lk2OrderUrl + "/GetOrderAmountByWeight?";
    url_ += "QueryStartTime=" + encodeURIComponent("" + QueryStartTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + WarehouseCode) + "&";
    url_ += "MinTotalWeight=" + encodeURIComponent("" + MinTotalWeight) + "&";
    url_ += "MaxTotalWeight=" + encodeURIComponent("" + MaxTotalWeight);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }

  //时间段产生订单量
  GetOrderAmountByCreateTime(QueryStartTime, QueryEndTime, WarehouseCode) {
    let url_ = this.lk2OrderUrl + "/GetOrderAmountByCreateTime?";
    url_ += "QueryStartTime=" + encodeURIComponent("" + QueryStartTime) + "&";
    url_ += "QueryEndTime=" + encodeURIComponent("" + QueryEndTime) + "&";
    url_ += "WarehouseCode=" + encodeURIComponent("" + WarehouseCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }
  //根据代码查找组别
  GetGroupByOwnerCode(ownerCode) {
    let url_ = "http://cainiao.linkong.vip:22743/api/services/app/OwnerGroupMembers/GetGroupByOwnerCode?";
    url_ += "ownerCode=" + encodeURIComponent("" + ownerCode);
    return this.http.request("get", url_, this.options_)
      .map((response: any) => { return response; })
  }

  //返回时间
  rCreateTime() {
    //昨天的时间
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate() + " 16:00:00";

    // console.log(s1);
    return s1;
    // return this.createTime;
  }

  // 产生随机数
  getRand(): number {
    let number = Math.ceil(Math.random()*10);
    return number
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