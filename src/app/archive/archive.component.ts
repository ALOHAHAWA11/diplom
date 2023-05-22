import { Component } from '@angular/core';
import {LaunchesService} from "../service/launches.service";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {

  private _archive: any = []
  constructor(private _launchService: LaunchesService) {
    this._launchService.getArchive().subscribe((data: any) => this._archive = data)
  }

  public getLaunches() {
    return this._archive
  }
}
