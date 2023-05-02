import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GlobeComponent } from './globe/globe.component';
import { FooterComponent } from './footer/footer.component';
import { BoardComponent } from './board/board.component';
import {HttpClientModule} from "@angular/common/http";
import {LaunchesService} from "./service/launches.service";
import {Routes, RouterModule} from "@angular/router";
import { LaunchComponent } from './launch/launch.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'launch/:id', component: LaunchComponent},
  // {path: ''}
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot((appRoutes))
  ],
  providers: [LaunchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
