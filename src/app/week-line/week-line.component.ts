import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-line',
  templateUrl: './week-line.component.html',
  styleUrls: ['./week-line.component.css']
})
export class WeekLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  public lineChartData: Array<any> = [
    { data: [45, 25, 65], label: 'Series A' },
  ];
  public lineChartLabels: Array<any> = ['1', '2', '3'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(18,149,219,0.2)',
      borderColor: 'rgba(18,149,219,1)',
      pointBackgroundColor: 'rgba(18,149,219,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(18,149,219,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}






