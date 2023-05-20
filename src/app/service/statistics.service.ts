import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {debounceTime, delay, EMPTY, expand, from, interval, switchMap, tap} from "rxjs";


@Injectable()
export class StatisticsService {

  private start_date: Date | undefined = new Date()
  private end_date: Date | undefined = new Date()
  private _launches: any = []

  constructor(private _http: HttpClient) {

  }

  public setStartDate(date: Date | undefined) {
    this.start_date = date
  }

  public setEndDate(date: Date | undefined) {
    this.end_date = date
  }

  getLaunches = (url: string) => from(fetch(url)).pipe(
    delay(15000),
    switchMap(response => {
      return response.json();
    })
  )

  public getFilteredLaunches() {
    this.getLaunches(`https://ll.thespacedevs.com/2.2.0/launch/?limit=1000&window_end__lte=${this.end_date}&window_start__gte=${this.start_date}`).pipe(
      tap(response => (rows: string | any[]) => {
        rows.concat(response.result)
      }),
      expand((previousData) => {
        console.log(previousData)
        this._launches.push(...previousData.results)
        console.log(this._launches)
        return previousData.next ? this.getLaunches(previousData.next) : EMPTY;
      })
    ).subscribe()
    return this._launches
  }

}
