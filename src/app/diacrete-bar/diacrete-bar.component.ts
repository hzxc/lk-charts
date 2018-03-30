import { Component, OnInit,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-diacrete-bar',
  templateUrl: './diacrete-bar.component.html',
  styleUrls: ['./diacrete-bar.component.css'],  
})
export class DiacreteBarComponent implements OnInit {

  options;
  data;
  constructor() { }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        },
        // showXAxis:false,
        // showYAxis:false,
      }
    }
    this.data = [
      {
        key: "Cumulative Return",
        values: [
          {
            "label" : "A" ,
            "value" : 40
          } ,
          {
            "label" : "B" ,
            "value" : 0
          } ,
          {
            "label" : "C" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "D" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "E" ,
            "value" :89
          } ,
          {
            "label" : "F" ,
            "value" : 75
          } ,
          {
            "label" : "G" ,
            "value" : 56
          } ,
          {
            "label" : "H" ,
            "value" : 45
          }
        ]
      }
    ];
  }
}
