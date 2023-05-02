import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {LaunchDTO} from "../DTO/LaunchDTO";
import {PadDTO} from "../DTO/PadDTO";
import {RocketDTO} from "../DTO/RocketDTO";


@Injectable()
export class LaunchesService {

  private _previous: string = '';
  private _next: string = '';
  constructor(private _http: HttpClient) {
  }

  public getLaunches(): Observable<LaunchesDTO> {
    return this._http.get(
      `https://lldev.thespacedevs.com/2.2.0/launch/?window_start__gte=${new Date().toJSON()}&limit=5`).pipe(
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
        return launches;
      }))

  }

  public getPage(offset: number): Observable<LaunchesDTO> {
    return this._http.get(`https://lldev.thespacedevs.com/2.2.0/launch/?window_start__gte=${new Date().toJSON()}&limit=5&offset=${offset}`).pipe(
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
        return launches;
      }))
  }

  public getLaunch(id: number): Observable<LaunchDTO> {
    return this._http.get(`https://lldev.thespacedevs.com/2.2.0/launch/${id}`).pipe(
      map((data: any) => {

        let launch = new LaunchDTO(data['id'], data['name'], data['window_start'], data['window_end'],
          data['image'], undefined, undefined, data['webcast_live'], data['launch_service_provider']['country_code'],
          data['launch_service_provider']['type'], data['rocket']['configuration']['reusable'],
          data['rocket']['configuration']['family'], data['rocket']['configuration']['wiki_url'], undefined, data['infoURLs']);
          if (data['vidURLs'][0]) {
            launch.video_urls = data['vidURLs'][0]['url']
          }
          else launch.video_urls = ''
        return launch;
      }))
  }
}
