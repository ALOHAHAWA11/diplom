import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private _auth: AuthService, private _router: Router,) {
  }
  public isAuthenticated() {
    return this._auth.isAuthenticated()
  }

  public getUsername() {
    return this._auth.username
  }

  public logout() {
    this._auth.logout()
    this._router.navigate(['/'])
  }

}
