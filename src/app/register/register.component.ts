import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {User} from "../DTO/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  private _username: string = ''
  private _password: string = ''
  private _re_password: string = ''

  private _email: string = ''
  @ViewChild("submitButton") _submitButton: ElementRef | undefined;
  private _sub: Subscription | undefined

  constructor(private _auth: AuthService, private _router: Router, private _route: ActivatedRoute) {
  }

  public submit(form: NgForm) {
    this._submitButton?.nativeElement.setAttribute('disabled', true)
    this._sub = this._auth.register(new User(this._username, this._password, this._re_password, this._email)).subscribe(
      (data) => {
        console.log(data)
        this._submitButton?.nativeElement.removeAttribute('disabled')
        this._router.navigate(['/auth'])
      },
      //TODO add popup
      () => this._submitButton?.nativeElement.removeAttribute('disabled')
    )
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get re_password(): string {
    return this._re_password;
  }

  set re_password(value: string) {
    this._re_password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  ngOnDestroy() {
    if (this._sub) this._sub?.unsubscribe()
  }
}
