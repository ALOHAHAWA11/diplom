import {Component,  OnInit} from '@angular/core';
import {LaunchesService} from "../service/launches.service";
import {Subscription} from "rxjs";
import {LaunchesDTO} from "../DTO/LaunchesDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private _id: number | undefined;
  private _subscription$: Subscription = new Subscription()
  private _launches: LaunchesDTO = new LaunchesDTO()

  private _offset: number = 0;
  constructor(private _launchesService: LaunchesService, private activateRoute: ActivatedRoute) {
    this._subscription$ = activateRoute.params.subscribe(params => this._id = params['id']);
  }

  ngOnInit(): void {
    this._subscription$ = this._launchesService.getLaunches().subscribe((data: any) => this._launches = data);
  }

  get get_launches(): LaunchesDTO {
    return this._launches;
  }

  get get_next(): LaunchesDTO {
    this._offset = this._offset < 0 ? this._offset = 0 : this._offset
    this._offset += 5
    this._subscription$ = this._launchesService.getPage(this._offset).subscribe((data: any) => this._launches = data);
    return this._launches
  }

  get get_previous(): LaunchesDTO {
    this._offset = this._offset < 0 ? this._offset = 0 : this._offset
    this._offset -= 5
    this._subscription$ = this._launchesService.getPage(this._offset).subscribe((data: any) => this._launches = data);
    return this._launches
  }
}
