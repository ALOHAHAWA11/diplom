import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {RocketDTO} from "../DTO/RocketDTO";
import {ActivatedRoute} from "@angular/router";
import {LaunchesService} from "../service/launches.service";
import {LaunchDTO} from "../DTO/LaunchDTO";

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent {
  private _id: number;
  private _subscription$: Subscription = new Subscription();
  private _launch: LaunchDTO = new LaunchDTO();

  constructor(private _launchesService: LaunchesService, private activateRoute: ActivatedRoute) {
    this._id = activateRoute.snapshot.params['id']
    this._subscription$ = this._launchesService.getLaunch(this._id).subscribe((data: any) => this._launch = data)
  }

  public getLaunch() {
    return this._launch;
  }
}
