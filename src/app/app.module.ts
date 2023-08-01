import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-cdbangular';

import { NavbarComponent } from './components/navigation/navbar/component/navbar/navbar.component';
import { SidebarComponent } from './components/navigation/sidebar/component/sidebar/sidebar.component';
import { HomepageComponent } from './components/pages/home/component/homepage/homepage.component';
import { GamblerspageComponent } from './components/pages/gamblers/component/gamblerspage/gamblerspage.component';
import { StatespageComponent } from './components/pages/states/component/statespage/statespage.component';
import { HostspageComponent } from './components/pages/hosts/component/hostspage/hostspage.component';
import { RulespageComponent } from './components/pages/rules/component/rulespage/rulespage.component';
import { PlayoffspageComponent } from './components/pages/playoffs/component/playoffspage/playoffspage.component';
import { MatchespageComponent } from './components/pages/matches/component/matchespage/matchespage.component';
import { GroupspageComponent } from './components/pages/groups/component/groupspage/groupspage.component';
import { BetspageComponent } from './components/pages/bets/component/betspage/betspage.component';
import { ResultspageComponent } from './components/pages/results/component/resultspage/resultspage.component';
import { TeamspageComponent } from './components/pages/teams/component/teamspage/teamspage.component';
import { ControlTeamComponent } from './components/pages/teams/component/control-team/control-team.component';
import { ControlHostComponent } from './components/pages/hosts/component/control-host/control-host.component';

import { FormsModule } from '@angular/forms';

import { SharedDataService } from './components/services/sharedService';
import { equiposService } from './components/services/equiposService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ControlGamblersComponent } from './components/pages/gamblers/component/control-gamblers/control-gamblers.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomepageComponent,
    GamblerspageComponent,
    StatespageComponent,
    HostspageComponent,
    RulespageComponent,
    PlayoffspageComponent,
    MatchespageComponent,
    GroupspageComponent,
    BetspageComponent,
    ResultspageComponent,
    TeamspageComponent,
    ControlTeamComponent,
    ControlHostComponent,
    ControlGamblersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [SharedDataService, equiposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
