import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {GlobeComponent} from './globe/globe.component';
import {FooterComponent} from './footer/footer.component';
import {BoardComponent} from './board/board.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LaunchesService} from "./service/launches.service";
import {Routes, RouterModule} from "@angular/router";
import {LaunchComponent} from './launch/launch.component';
import {MainComponent} from './main/main.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from "./service/auth.service";
import {FormsModule} from "@angular/forms";
import {TokenInterceptor} from "./service/token.interceptor";
import {GlobeService} from "./service/globe.service";
import { StatisticsComponent } from './statistics/statistics.component';
import {StatisticsService} from "./service/statistics.service";

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'launch/:id', component: LaunchComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'statistics', component: StatisticsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GlobeComponent,
    FooterComponent,
    BoardComponent,
    LaunchComponent,
    MainComponent,
    AuthenticationComponent,
    RegisterComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot((appRoutes)),
    FormsModule
  ],
  providers: [
    GlobeService,
    LaunchesService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    StatisticsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
