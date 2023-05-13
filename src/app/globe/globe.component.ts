import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {Subscription} from "rxjs";
import {GlobeService} from "../service/globe.service";


am4core.useTheme(am4themes_animated)

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4maps.MapChart | undefined;
  private imageSeries: am4maps.MapImageSeries | undefined
  private _launches: LaunchesDTO = new LaunchesDTO()

  constructor(public _globeService: GlobeService) {
    this._globeService.getLaunchesForGlobe().subscribe((data: any) => this._launches = data)
    console.log(this._launches)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.chart = am4core.create("chartdiv", am4maps.MapChart)
    this.chart.geodata = am4geodata_worldLow
    this.chart.projection = new am4maps.projections.Orthographic()
    this.chart.panBehavior = "rotateLongLat"
    this.chart.mouseWheelBehavior = "none"
    this.imageSeries = this.chart.series.push(new am4maps.MapImageSeries())
    let imageSeriesTemplate = this.imageSeries.mapImages.template;
    this._globeService.getLaunchesForGlobe().subscribe((data: any) => this._launches = data)
    console.log(this._launches)
    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 5;

    circle.tooltipText = "{name}";
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";
    circle.radius = 3;
    circle.propertyFields.fill = "color";
    let circle2 = this.imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.tooltipText = "{name}";

    circle2.radius = 10;
    circle2.propertyFields.fill = "color";


    let colorSet = new am4core.ColorSet();

    this.imageSeries.data = [{
      "title": "Falcon 9 Block 5 | Axiom Space Mission 2",
      "latitude": 28.60822681,
      "longitude": -80.60428186,
      "color": colorSet.next()
    }, {
      "title": "Falcon 9 Block 5 | BADR-8",
      "latitude": 28.56194122,
      "longitude": -80.57735736,
      "color": colorSet.next()
    }, {
      "title": "Nuri | NEXTSat-2 & SNIPE",
      "latitude": 34.431867,
      "longitude": 127.535069,
      "color": colorSet.next()
    }, {
      "title": "Soyuz 2.1a | Progress MS-23 (84P)",
      "latitude": 45.996034,
      "longitude": 63.564003,
      "color": colorSet.next()
    }, {
      "title": "Soyuz 2.1b/Fregat-M | Kondor-FKA No.1",
      "latitude": 51.884395,
      "longitude": 128.333932,
      "color": colorSet.next()
    }, {
      "title": "Falcon 9 Block 5 | Starlink Group 6-4",
      "latitude": 40.4167,
      "longitude": -3.7033,
      "color": colorSet.next()
    }, {
      "title": "Falcon 9 Block 5 | Starlink Group 6-3",
      "latitude": 28.56194122,
      "longitude": -80.57735736,
      "color": colorSet.next()
    }, {
      "title": "Electron | Coming To A Storm Near You (TROPICS-3)",
      "latitude": -39.262833,
      "longitude": 177.864469,
      "color": colorSet.next()
    }, {
      "title": "Long March 2F/G | Shenzhou 16",
      "latitude": 40.958093,
      "longitude": 100.291188,
      "color": colorSet.next()
    }, {
      "title": "Falcon 9 Block 5 | Starlink Group 5-7",
      "latitude": 34.632,
      "longitude": -120.611,
      "url": "http://www.google.co.jp",
      "color": colorSet.next()
    }];


    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries())
    polygonSeries.useGeodata = true

    let grid = this.chart.series.push(new am4maps.GraticuleSeries());
    grid.mapLines.template.line.stroke = am4core.color("white");
    // grid.mapLines.template.line.strokeOpacity = 0.5;


    let polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = "{name}"
    polygonTemplate.polygon.fillOpacity = 0.3
    polygonTemplate.fill = am4core.color("#03cafc")
    let hs = polygonTemplate.states.create("hover")
    hs.properties.fill = am4core.color("74X999")


  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }


}
