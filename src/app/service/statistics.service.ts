import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {LaunchDTO} from "../DTO/LaunchDTO";
import {PadDTO} from "../DTO/PadDTO";
import {RocketDTO} from "../DTO/RocketDTO";

@Injectable()
export class StatisticsService {

  private start_date: Date | undefined = new Date()
  private end_date: Date | undefined = new Date()
  private limit: number = 0
  constructor(private _http: HttpClient) {

  }
  public setLimit(limit: number) {
    this.limit = limit
  }
  public setStartDate(date: Date | undefined) {
    this.start_date = date
  }

  public setEndDate(date: Date | undefined) {
    this.end_date = date
  }

  public getFilteredLaunches(): Observable<LaunchesDTO>{
    let url = `https://lldev.thespacedevs.com/2.2.0/launch/`
    // console.log(this.start_date.toJSON())
    if (this.start_date || this.end_date) {
      url += `?window_start__gte=${this.start_date}&window_end__lte=${this.end_date}&limit=${this.limit}`
    }
    console.log(url)
    return this._http.get(url).pipe(
      map((data: any) => {
        let launches: LaunchesDTO = new LaunchesDTO(data['count'],
          data['next'], data['previous'], [])
        for (let launch_item of data['results']) {
          launches.launches.push(new LaunchDTO(
            launch_item['id'], launch_item['name'], launch_item['window_start'], launch_item['window_end'],
            launch_item['image'], new PadDTO(launch_item['pad']['id'], launch_item['pad']['wiki_url'],
              launch_item['pad']['latitude'], launch_item['pad']['longitude'],
              launch_item['pad']['total_launch_count']), new RocketDTO(launch_item['rocket']['id'],
              launch_item['rocket']['configuration']['full_name']), launch_item['webcast_live'])
          )
        }
        return launches
      }))
  }
}
