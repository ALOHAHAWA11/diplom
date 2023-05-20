import {Component} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {StatisticsService} from "../service/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  private _launches: any = []
  private _start_date: undefined | Date
  private _end_date: undefined | Date
  private _type: any = 'all_status'

  private _status: any = 'all_launches'

  private _countryCode: any = ''

  private _orbit: any = 'ALL'

  constructor(private statisticsService: StatisticsService) {
  }

  get type(): any {
    return this._type;
  }

  set type(value: any) {
    this._type = value;
  }

  get status(): any {
    return this._status;
  }

  set status(value: any) {
    this._status = value;
  }

  get countryCode(): any {
    return this._countryCode;
  }

  set countryCode(value: any) {
    this._countryCode = value.toUpperCase();
  }

  get orbit(): any {
    return this._orbit;
  }

  set orbit(value: any) {
    this._orbit = value;
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
    // @ts-ignore
    this.statisticsService.setStartDate(new Date(this._start_date).toJSON())
    // @ts-ignore
    this.statisticsService.setEndDate(new Date(this._end_date).toJSON())
    // @ts-ignore
    this.getYears(new Date(this._end_date), new Date(this._start_date))
    this._launches = this.statisticsService.getFilteredLaunches()
  }

  public getYears(end: Date, start: Date) {
    return end.getUTCFullYear() - start.getFullYear()
  }

  public formInterval(startYear: number, endYear: number) {
    let years = []
    while (startYear <= endYear) {
      years.push(startYear)
      startYear += 1
    }
    return years
  }

  public formStatistics() {
    am4core.useTheme(am4themes_animated)
    let chart = am4core.create("chartdiv", am4charts.XYChart)

    // @ts-ignore
    let years = this.formInterval(new Date(this._start_date).getUTCFullYear(), new Date(this._end_date).getFullYear())
    let dictionary = {}
    for (let year of years) {
      // @ts-ignore
      dictionary[`${year}`] = 0
      chart.data.push({
        'year': year,
        'count': 0
      })
    }

    console.log(dictionary)

    console.log(chart.data)
    console.log(this._launches)




    for (let launch of this._launches) {
      if (this._type != 'all_status') {
        if (launch['launch_service_provider'] != this._type) continue
      }
      if (this._status != 'all_launches') {
        if (launch['_status']['name'] != this._status) continue
      }
      if (this._countryCode != '') {
        if (launch['pad']['country_code'] != this._countryCode) continue
      }
      if (this._orbit != 'ALL') {
        if (launch['mission']['_orbit']['abbrev'] != this._orbit) continue
      }
      console.log(this._countryCode)
      console.log(launch['pad']['country_code'] )
      for (let year in dictionary) {
        let window_start = new Date(launch['window_start']).toJSON().split('-')[0]
        console.log('here')
        console.log(window_start)
        console.log(launch)
        if (window_start == year) {
          // @ts-ignore
          dictionary[year] += 1
          for (let data of chart.data) {
            if (data['year'] == year) data['count'] += 1
          }
        }
      }
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

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "year";
    series.name = "Count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

}
