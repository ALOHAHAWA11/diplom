import {Component} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {GlobeService} from "../service/globe.service";
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {StatisticsService} from "../service/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  private _launches: LaunchesDTO = new LaunchesDTO()
  private _limit: number = 0
  private _start_date: undefined | Date
  private _end_date: undefined | Date

  constructor(private statisticsService: StatisticsService) {
  }


  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get start_date(): Date | undefined {
    return this._start_date;
  }

  set start_date(value: Date | undefined) {
    this._start_date = value;
  }

  get end_date(): Date | undefined {
    return this._end_date;
  }

  set end_date(value: Date | undefined) {
    this._end_date = value;
  }

  public setParams() {
    // // @ts-ignore
    // this._start_date = new Date(this._start_date).toJSON()
    // // @ts-ignore
    // this._end_date = new Date(this._end_date).toJSON()
    console.log(this._end_date, this._start_date)
    this.statisticsService.setLimit(this._limit)
    // @ts-ignore
    this.statisticsService.setStartDate(new Date(this._start_date).toJSON())
    // @ts-ignore
    this.statisticsService.setEndDate(new Date(this._end_date).toJSON())
    this.statisticsService.getFilteredLaunches().subscribe((data) => this._launches = data)
  }


  public formIntervals() {
    // @ts-ignore
    let difference = new Date(this._end_date).getFullYear() - new Date(this._start_date).getFullYear()
    let data = []
    for (let launch of this._launches.launches) {
      if (launch.window_start.getFullYear())
        data.push({

        })


    }


  }
  public formStatistics() {
    // @ts-ignore
    console.log()

    am4core.useTheme(am4themes_animated)
    let chart = am4core.create("chartdiv", am4charts.XYChart)
    chart.data = [];
    console.log(this._launches)
    for (let launch of this._launches.launches) {
      console.log(launch)
      chart.data.push({
        'total_launch_count': launch.pad.get_total_launch_count,
        'year': new Date(launch.window_start).getMonth()
      })

    }
    console.log(chart.data)
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.adapter.add("dy",
      function (dy: number | undefined, target) {
        if (target.dataItem && (target.dataItem.index & 2) == 2) {
          // @ts-ignore
          return dy + 25;
        }
        return dy;
      });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "total_launch_count";
    series.dataFields.categoryX = "year";
    series.name = "Count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

}
