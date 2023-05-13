import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {LaunchDTO} from "../DTO/LaunchDTO";
import {PadDTO} from "../DTO/PadDTO";
import {RocketDTO} from "../DTO/RocketDTO";
import {GlobeComponent} from "../globe/globe.component";


@Injectable()
export class GlobeService {

  constructor(private _http: HttpClient) {

  }
  public getLaunchesForGlobe(): Observable<LaunchesDTO>{
    return this._http.get(
      `https://lldev.thespacedevs.com/2.2.0/launch/?window_start__gte=${new Date().toJSON()}`).pipe(
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
        console.log(launches)
        return launches
      }))
  }
}
