import {Component} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"


am4core.useTheme(am4themes_animated)

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent {
  private chart: am4maps.MapChart | undefined;



  ngAfterViewInit() {
    this.chart = am4core.create("chartdiv", am4maps.MapChart)
    this.chart.geodata = am4geodata_worldLow
    this.chart.projection = new am4maps.projections.Orthographic()
    this.chart.panBehavior = "rotateLongLat"
    this.chart.mouseWheelBehavior = "none"
    let imageSeries = this.chart.series.push(new am4maps.MapImageSeries())

    let imageSeriesTemplate = imageSeries.mapImages.template;

    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 5;
    // circle.fill = am4core.color("red");
    // circle.stroke = am4core.color("red");
    // circle.strokeWidth = 2;
    circle.nonScaling = true;
    circle.tooltipText = "{title}";
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";

    let circle1 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 3;
    circle.propertyFields.fill = "color";
    circle.nonScaling = true;

    let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 3;
    circle2.propertyFields.fill = "color";



    let colorSet = new am4core.ColorSet();

    imageSeries.data = [ {
      "title": "Brussels",
      "latitude": 50.8371,
      "longitude": 4.3676,
      "color":colorSet.next()
    }, {
      "title": "Copenhagen",
      "latitude": 55.6763,
      "longitude": 12.5681,
      "color":colorSet.next()
    }, {
      "title": "Paris",
      "latitude": 48.8567,
      "longitude": 2.3510,
      "color":colorSet.next()
    }, {
      "title": "Reykjavik",
      "latitude": 64.1353,
      "longitude": -21.8952,
      "color":colorSet.next()
    }, {
      "title": "Moscow",
      "latitude": 55.7558,
      "longitude": 37.6176,
      "color":colorSet.next()
    }, {
      "title": "Madrid",
      "latitude": 40.4167,
      "longitude": -3.7033,
      "color":colorSet.next()
    }, {
      "title": "London",
      "latitude": 51.5002,
      "longitude": -0.1262,
      "url": "http://www.google.co.uk",
      "color":colorSet.next()
    }, {
      "title": "Peking",
      "latitude": 39.9056,
      "longitude": 116.3958,
      "color":colorSet.next()
    }, {
      "title": "New Delhi",
      "latitude": 28.6353,
      "longitude": 77.2250,
      "color":colorSet.next()
    }, {
      "title": "Tokyo",
      "latitude": 35.6785,
      "longitude": 139.6823,
      "url": "http://www.google.co.jp",
      "color":colorSet.next()
    }, {
      "title": "Ankara",
      "latitude": 39.9439,
      "longitude": 32.8560,
      "color":colorSet.next()
    }, {
      "title": "Buenos Aires",
      "latitude": -34.6118,
      "longitude": -58.4173,
      "color":colorSet.next()
    }, {
      "title": "Brasilia",
      "latitude": -15.7801,
      "longitude": -47.9292,
      "color":colorSet.next()
    }, {
      "title": "Ottawa",
      "latitude": 45.4235,
      "longitude": -75.6979,
      "color":colorSet.next()
    }, {
      "title": "Washington",
      "latitude": 38.8921,
      "longitude": -77.0241,
      "color":colorSet.next()
    }, {
      "title": "Kinshasa",
      "latitude": -4.3369,
      "longitude": 15.3271,
      "color":colorSet.next()
    }, {
      "title": "Cairo",
      "latitude": 30.0571,
      "longitude": 31.2272,
      "color":colorSet.next()
    }, {
      "title": "Pretoria",
      "latitude": -25.7463,
      "longitude": 28.1876,
      "color":colorSet.next()
    } ];


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
