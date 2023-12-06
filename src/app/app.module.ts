import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-cdbangular';
import { CDBFreeModule } from 'ng-cdbangular';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SedesService } from './components/services/sedesService';
import { apostadoresService } from './components/services/apostadoresService';
import { competenciasService } from './components/services/competenciasService';
import { equiposxcompetenciaService } from './components/services/equiposxcompetenciasService';
import { partidosGruposService } from './components/services/partidosgrupoService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ControlGamblersComponent } from './components/pages/gamblers/component/control-gamblers/control-gamblers.component';
import { TournamentspageComponent } from './components/pages/tournaments/components/tournamentspage/tournamentspage.component';
import { ControlTournamentsComponent } from './components/pages/tournaments/components/control-tournaments/control-tournaments.component';
import { TeamsxtournamentComponent } from './components/pages/teamsxtournament/components/teamsxtournament/teamsxtournament.component';
import { BetgroupsComponent } from './components/pages/betgroups/components/betgroups/betgroups.component';




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
    ControlGamblersComponent,
    TournamentspageComponent,
    ControlTournamentsComponent,
    TeamsxtournamentComponent,
    BetgroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    RouterModule.forRoot([]),
    TimepickerModule.forRoot(),
    HttpClientModule,
    CDBFreeModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [SharedDataService, equiposService, SedesService, competenciasService, apostadoresService, partidosGruposService, equiposxcompetenciaService, BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
