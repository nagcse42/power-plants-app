import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import { TopographyService } from '../services/topography.service';

@Component({
  selector: 'power-plants',
  templateUrl: './power-plants.component.html',
  styleUrls: ['./power-plants.component.scss']
})
export class PowerPlantsComponent implements OnInit {
  svg: any;
  projection: any;
  topoFeatureStates: any;
  path: any;
  topography: any;
  toolTipInfo: any;
  powerGenerationInfo: any;
  topGenerationPlantData: any;
  plantData: any;
  plantLoctnAnfGnrtnData:any=[];
  topNPlants: any;
  selectedState: any;
  statesList:any = [{code:'ALL', desc:'ALL'},{code:'AK', desc:'AK'}, {code:'NY', desc:'NY'}, {code:'CA', desc:'CA'}];

  constructor(
    private topographyService: TopographyService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.topographyService.getPowerPlanInfo().subscribe((data)=>{
      this.plantData = data;
      this.fetchDataAndRenderMap();
    });
  }

  fetchDataAndRenderMap() {
    this.topographyService.getPowerGenerationInfo().subscribe((powerGenerationData: any) => {
      this.powerGenerationInfo = powerGenerationData;
      this.prepateTopGenerationPlants(1000);
      this.topographyService.getTopographyData().subscribe((topographyData: any) => {
        this.topography = topographyData;
        this.renderMap(this.topography, this.topGenerationPlantData);
      });
    });
  }

  fetchTopNPlants() {
    console.log('fetch top n plants clicked');
    //this.renderMap(this.topography, []);
    let filteredByStateData: any;
    let topFilteredData: any;
    if(this.selectedState && this.topNPlants) {
      filteredByStateData = this.plantLoctnAnfGnrtnData.filter(data => data.PSTATABB == this.selectedState.code);
      topFilteredData = filteredByStateData.slice(0, Number(this.topNPlants));
      this.renderMap(this.topography, topFilteredData);
    } else if(this.selectedState){
      filteredByStateData = this.plantLoctnAnfGnrtnData.filter(data => data.PSTATABB == this.selectedState.code);
     this.renderMap(this.topography, filteredByStateData);
    } else if(this.topNPlants) {
      topFilteredData = this.plantLoctnAnfGnrtnData.slice(0, Number(this.topNPlants));
      this.renderMap(this.topography, topFilteredData);
    }
  }

  prepateTopGenerationPlants(topNPlantsNumber: number) {
    const plantsInfo: any[] = Object.values(this.plantData);
    for (let generatoinData of this.powerGenerationInfo) {
      if (!!generatoinData.GENNTAN && generatoinData.GENNTAN != 0) {
        let existedPlanItem = this.plantLoctnAnfGnrtnData.find(data => data.PNAME == generatoinData.PNAME);
        if(existedPlanItem) {
           existedPlanItem.GENNTAN = existedPlanItem.GENNTAN + generatoinData.GENNTAN ;
           let existedItemIdx = this.plantLoctnAnfGnrtnData.findIndex(data => data.PNAME == generatoinData.PNAME);
           this.plantLoctnAnfGnrtnData[existedItemIdx] = existedPlanItem;
        } else {
          if (!!this.plantData) {
            let plantInfo = plantsInfo.find(data => data.PNAME == generatoinData.PNAME);
            if (plantInfo && !!plantInfo.lon && !!plantInfo.lat) {
                generatoinData['lat']=plantInfo.lat;
                generatoinData['lon']=plantInfo.lon;
                generatoinData['NERC']=plantInfo.NERC;
                generatoinData['PSTATABB']=plantInfo.PSTATABB;
            } else {
                generatoinData['lat']=0;
                generatoinData['lon']=0;
                generatoinData['NERC']='Missing in Data';
                generatoinData['PSTATABB']='Missing in Data';
            }
          }
          this.plantLoctnAnfGnrtnData.push(generatoinData);
        }
      }
    }

    //Sort plant generation data
    this.plantLoctnAnfGnrtnData.sort((a, b) => {return b.GENNTAN - a.GENNTAN});

    this.topGenerationPlantData = this.plantLoctnAnfGnrtnData.slice(0, topNPlantsNumber);
    console.log('data length: ' + this.powerGenerationInfo.length);
    console.log('plantLoctnAnfGnrtnData length: ' + this.plantLoctnAnfGnrtnData.length);
    console.log('top n dqata length: ' + this.topGenerationPlantData.length);
  }

  renderMap(topography: any, plantData: any): void {
    //d3.select("svg").remove();
    const { width, height } = this.getMapContainerWidthAndHeight();

    this.topoFeatureStates = topojson.feature(
      topography,
      topography.objects.states
    );

    this.projection = d3
      .geoIdentity()
      .fitSize([width, height], this.topoFeatureStates);

    this.path = d3.geoPath(this.projection);

    // render svg
    this.svg = d3
      .select('svg')
      .attr('width', width + 50)
      .attr('height', height);

    this.renderNationFeaturesWithShadow(topography);
    this.renderCountiesFeatures(topography);
    this.renderStateFeaures(topography);
    this.renderBubbles(plantData);
    // zoom map  
    // this.svg.append("rect")
    // .attr("class", "background")
    // .attr("width", width)
    // .attr("height", height)

    // resize event
    d3.select(window).on('resize', this.resizeMap);
  }


  renderBubbles(plantData: any) {
    const { width, height } = this.getMapContainerWidthAndHeight();

    let projection1 = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(1070 / 960 * width);

  this.svg.selectAll("circle")
    .data(plantData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return projection1([d.lon, d.lat]) ? projection1([d.lon, d.lat])[0] : 0;
    })
    .attr("cy", function (d) {
      return projection1([d.lon, d.lat]) ? projection1([d.lon, d.lat])[1] : 0;
    })
    .attr("r", 9)
    .attr("fill", function (d) {
      return "blueviolet";
    })
    .on("mouseover", (event: any, d: any) => {
      if (d) {
        this.toolTipInfo = {
          plantName: d.NERC,
          state: d.PSTATABB,
          netGeneration: d.GENNTAN
        };
        var tooltip = document.getElementById('tooltip');
        if(!!tooltip) {
          tooltip.style.left = event.pageX + 'px';
          tooltip.style.top = (event.pageY - 20) + 'px';
          tooltip.style.opacity = '1';
        }
      }
    })
    .on("mouseout", (d) => {
      this.toolTipInfo = undefined;
    });
  }

  renderNationFeaturesWithShadow(topography: any): void {
    const defs = this.svg.select('defs');
    defs
      .append('path')
      .datum(topojson.feature(topography, topography.objects.nation))
      .attr('id', 'nation')
      .attr('d', this.path);

    this.svg
      .append('use')
      .attr('xlink:href', '#nation')
      .attr('fill-opacity', 0.2)
      .attr('filter', 'url(#blur)');

    this.svg.append('use').attr('xlink:href', '#nation').attr('fill', 'red');

    // extra touch (counties in grid)
    this.svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 0.35)
      .attr(
        'd',
        this.path(
          topojson.mesh(
            topography,
            topography.objects.counties,
            (a: any, b: any) => {
              // tslint:disable-next-line:no-bitwise
              return ((a.id / 1000) | 0) === ((b.id / 1000) | 0);
            }
          )
        )
      );
    // end extra touch
  }

  renderCountiesFeatures(topography: any): void {
    this.svg
      .append('g')
      .attr('class', 'county')
      .attr('fill', 'grey')
      .selectAll('path')
      .data(
        topojson.feature(topography, topography.objects.counties as any)
          .features
      )
      .join('path')
      .attr('id', (d: any) => {
        return d.id;
      })
      .attr('d', this.path);
  }

  renderStateFeaures(topography: any): void {
    this.svg
      .append('g')
      .attr('class', 'state')
      .attr('fill', 'none')
      .attr('stroke', '#BDBDBD')
      .attr('stroke-width', '0.7')
      .selectAll('path.state')
      .data(
        topojson.feature(topography, topography.objects.states as any).features
      )
      .join('path')
      .attr('id', (d: any) => {
        return d.id;
      })
      .attr('d', this.path);
  }

  resizeMap = () => {
    const { width, height } = this.getMapContainerWidthAndHeight();

    this.svg.attr('width', width + 50).attr('height', height);

    // update projection
    this.projection.fitSize([width, height], this.topoFeatureStates);

    // resize the map
    this.svg.selectAll('path').attr('d', this.path);
  };

  getMapContainerWidthAndHeight = (): { width: number; height: number } => {
    const mapContainerEl = this.el.nativeElement.querySelector(
      '#map'
    ) as HTMLDivElement;
    const width = mapContainerEl.clientWidth - 50;
    const height = (width / 960) * 600;

    return { width, height };
  };
}
