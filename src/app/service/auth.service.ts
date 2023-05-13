import {Injectable} from "@angular/core";
import {User} from "../DTO/User";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthService {

  private _token: string = ''

  private _username: string = ''

  constructor(private _http: HttpClient) {
  }

  public login(user: User): Observable<{token: string}> {
    this._username = user.getUsername()
    console.log(user)
    return this._http.post<{token: string}>('http://127.0.0.1:8000/auth/token/login/', user)
      .pipe(
        tap(
          (data: any) => {
            this._token = data['auth_token']
            localStorage.setItem('auth-token', this._token)
          }
        ),
      )
  }

  public register(user: User) {
    return this._http.post<User>('http://127.0.0.1:8000/api/v1/authusers/', user)
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  public isAuthenticated() {
    return !!this._token
  }

  public logout() {
    this.token = ''
    localStorage.clear()
  }
  get username(): string {
    return this._username;
  }
}
