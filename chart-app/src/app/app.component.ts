import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts/highmaps";
//import * as usGeo from "@highcharts/map-collection/countries/us/us-all.geo.json";
import { from } from "rxjs";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  chartOptions: any;
  title: string = "USA Power Generation Details";
  subTitle: string = "Power generation state wise and power plan details";
  usaData: any;
  seriesData: any[];
  statePowerdata: any[];

  topNPlants: any = 100;
  selectedState: any;
  statesList: any;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.usaData = this.dataService.getUSGeoData();
    this.statesList = this.dataService.getUsStates();
    this.dataService.getPowerGenerationInfo().subscribe((powerGenerationData: any) => {
      this.statePowerdata = powerGenerationData;
      this.prepareChartOptions();
    });

    // this.dataService.getPowerPlantInfo().subscribe((data) => {
    //   this.seriesData = data;
    // });
  }

  prepareChartOptions() {
    this.chartOptions = Highcharts.Options = {
      chart: {
        map: this.usaData,
        borderWidth: 1
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subTitle
      },
      legend: {
        enabled: true
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 1,
        type: 'logarithmic',
        minColor: '#d7b7ed',
        maxColor: '#9a46d4',
        stops: [
          [0, '#d7b7ed'],
          [0.67, '#774d94'],
          [1, '#9a46d4']
        ]
      },
      series: [
        {
          name: 'State',
          color: 'red',
          nullColor: '#88bbdb',
          enableMouseTracking: false
        }, {
          type: 'mapbubble',
          name: 'State Total Power Generation',
          //joinBy: ['postal-code', 'plantState'],
          //data: this.seriesData,
          joinBy: ['postal-code', 'state'],
          data: this.statePowerdata,
          minSize: 4,
          maxSize: '12%',
          tooltip: {
            pointFormat: '{point.properties.name}: {point.z} MWH'
          },
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '{point.state}'
          },
          animation: {
            duration: 1000
          }
        }
      ]
    };

    console.log('init function');
    console.log('init usaData');
  }
}
