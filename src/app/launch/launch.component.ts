import {Component, OnInit} from '@angular/core';
import {delay, Subscription} from "rxjs";
import {RocketDTO} from "../DTO/RocketDTO";
import {ActivatedRoute} from "@angular/router";
import {LaunchesService} from "../service/launches.service";
import {LaunchDTO} from "../DTO/LaunchDTO";
import {AuthService} from "../service/auth.service";
import {NgForm} from "@angular/forms";
import {Comment} from "../DTO/Comment";

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit{
  private _id: number;
  private _subscription$: Subscription = new Subscription();
  private _launch: LaunchDTO = new LaunchDTO();

  private _comment: string = ''

  private _comments: any = []

  constructor(private _launchesService: LaunchesService, private activateRoute: ActivatedRoute, private _auth: AuthService) {
    this._id = activateRoute.snapshot.params['id']

    this._subscription$ = this._launchesService.getLaunch(this._id).subscribe((data: any) => this._launch = data)


  }
  ngOnInit() {
    this._launchesService.getComments(String(this._id)).subscribe((data: any) => {
      this._comments = data
      })
    let launch = new LaunchDTO(String(this._id), this._launch.name,
      this._launch.window_start, this._launch.window_end)
    console.log(launch)
    this._launchesService.postLaunchPost(launch).subscribe((data) => console.log(data))
  }

  public getLaunch() {
    return this._launch;
  }

  public isAuthenticated() {
    return this._auth.isAuthenticated()
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }


  get comments(): any {
    return this._comments;
  }

  set comments(value: any) {
    this._comments = value;
  }

  public submitComment(form: NgForm) {
    // console.log(this._id)
    // let launch = new LaunchDTO(String(this._id), this._launch.name,
    //   this._launch.window_start, this._launch.window_end)
    // console.log(launch)
    // this._launchesService.postLaunchPost(launch).pipe(delay(5555)).subscribe((data) => console.log(data))
    let comment = new Comment(String(this._id), this._comment, this._auth.username, new Date())
    this._subscription$ = this._launchesService.postComment(comment).subscribe((data) => console.log(data))
  }
}
