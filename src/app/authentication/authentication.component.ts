import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {User} from "../DTO/User";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnDestroy{

  private _username: string = ''
  private _password: string = ''

  private _sub: Subscription | undefined;
  @ViewChild("submitButton") _submitButton: ElementRef | undefined;

  constructor(private _auth: AuthService, private _router: Router, private _route: ActivatedRoute) {

  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public submit(form: NgForm) {
    this._submitButton?.nativeElement.setAttribute('disabled', true)
    this._sub = this._auth.login(new User(this._username, this._password)).subscribe(
      (data) => {
        console.log(data)
        this._submitButton?.nativeElement.removeAttribute('disabled')
        this._router.navigate(['/'])
      },
      //TODO add popup
      () => this._submitButton?.nativeElement.removeAttribute('disabled')

    )
  }
  ngOnDestroy() {
    if (this._sub) this._sub?.unsubscribe()
  }
}
