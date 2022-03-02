import { Component, OnInit } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import * as Highcharts from "highcharts/highmaps";
//import * as usGeo from "@highcharts/map-collection/countries/us/us-all.geo.json";
import { from } from "rxjs";
import { DataService } from "../../services/data.service";
import { HighChartConfigService } from "../../services/high-chart.config.service";


@Component({
  selector: 'power-plants-high-charts',
  templateUrl: './power-plants-high-charts.component.html',
  styleUrls: ['./power-plants-high-charts.component.scss']
})
export class PowerPlantsHighChartsComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartOptions: any;
  title: string = "USA Power Generation Details";
  subTitle: string = "Power generation state wise and power plan details";
  usaData: any;
  powerPlantsData: any[];
  statePowerdata: any[];

  topNPlants: any = 100;
  selectedState: any;
  statesList: any;

  constructor(private dataService: DataService,
    private highChartConfigService: HighChartConfigService) {

  }

  ngOnInit() {
    this.usaData = this.highChartConfigService.getUSGeoData();
    this.statesList = this.highChartConfigService.getUsStates();
    this.rederDefaultMap();
  }

  rederDefaultMap() {
    this.dataService.getPowerGenerationInfo().subscribe((powerGenerationData: any) => {
      this.statePowerdata = powerGenerationData;
      this.dataService.getPowerPlantInfo().subscribe((plantsInfo) => {
        this.powerPlantsData = plantsInfo;
        this.prepareChartOptions(this.statePowerdata, this.powerPlantsData, this.usaData);
      });
    });
  }

  fetchTopNPlants() {
    if (!this.topNPlants) {
      this.topNPlants = 100;
    }
    if (this.selectedState && this.topNPlants) {
      this.dataService.getTopNPowerGenerationStates(this.topNPlants).subscribe((powerGenerationData: any) => {
        this.statePowerdata = powerGenerationData;
        this.statePowerdata = this.statePowerdata.filter(data => data.state == this.selectedState.code);
        this.dataService.getPowerPlantsByState(this.selectedState.code).subscribe((plantsInfo) => {
          this.powerPlantsData = plantsInfo;
          let featureId = 'US.' + this.selectedState.code;
          let filteredUsData = this.highChartConfigService.getUSGeoData();
          filteredUsData.features = filteredUsData.features.filter(ftr => ftr.id == featureId);
          this.chartOptions = null;
          this.prepareChartOptions(this.statePowerdata, this.powerPlantsData, filteredUsData);
        });
      });
    }
  }

  prepareChartOptions(statePowerInfo: any, plantsInfo: any, mapData: any) {
    this.chartOptions = {
      chart: {
        map: mapData,
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
        },
        {
          type: 'mapbubble',
          name: 'State Total Power Generation',
          //joinBy: ['postal-code', 'plantState'],
          //data: this.seriesData,
          joinBy: ['postal-code', 'state'],
          data: statePowerInfo,
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
        // ,{
        //   type: 'mappoint',
        //   name: 'Power plant info',
        //   joinBy: ['postal-code', 'plantState'],
        //   data: plantsInfo,
        //   // minSize: 4,
        //   // maxSize: '12%',
        //   tooltip: {
        //     pointFormat: '{point.properties.name}: {point.z} MWH'
        //   }
        // }
      ]
    };

    console.log('init function');
    console.log('init usaData');
  }
}
