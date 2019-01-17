import { Component } from '@angular/core';
import { HttpRequestManagerService } from '../../http-request-manager/http-request-manager.service';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  constructor(private httpRequestManager: HttpRequestManagerService) {

  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' },
    { data: [], label: 'Series B' }
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType = 'radar';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.getGdpData();
    this.getPopulationData();

  }
  getGdpData() {
    this.httpRequestManager.get("./assets/json/MOCK_DATA.json").subscribe(res => {
      let yearLabels = res['india_gdp'].map(ele => ele.date);
      let indiaGdp = res['india_gdp'].map(ele => ele.value);
      let usaGdp = res['usa_gdp'].map(ele => ele.value);
      let chinaGdp = res['china_gdp'].map(ele => ele.value);
      this.lineChartData = [
        { data: indiaGdp, label: "India" },
        { data: usaGdp, label: "Usa" },
        { data: chinaGdp, label: "China" }
      ];
      this.lineChartLabels.push(...yearLabels);
    })
  }
  getPopulationData() {
    this.httpRequestManager.get("./assets/json/population-stats.json").subscribe(res => {
      let indiaPopulation = res['india'].filter(ele => ele.date>2000).map(ele=>ele.value);
      let chinaPopulation = res['china'].filter(ele => ele.date>2000).map(ele=>ele.value);
      let usaPopulation = res['usa'].filter(ele => ele.date>2000).map(ele=>ele.value);
      let yearLabels = res['india'].filter(ele => ele.date>2000).map(ele=>ele.date);
      console.log(usaPopulation);
      this.barChartData = [{ data: indiaPopulation, label: "India" },
      { data: usaPopulation, label: "Usa" },
      { data: chinaPopulation, label: "China" }];
      this.barChartLabels.push(...yearLabels);
    })
  }

}
