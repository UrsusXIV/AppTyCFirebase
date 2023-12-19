import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/pages/home/component/homepage/homepage.component';
import { TeamspageComponent } from './components/pages/teams/component/teamspage/teamspage.component';
import { BetspageComponent } from './components/pages/bets/component/betspage/betspage.component';
import { GamblerspageComponent } from './components/pages/gamblers/component/gamblerspage/gamblerspage.component';
import { GroupspageComponent } from './components/pages/groups/component/groupspage/groupspage.component';
import { HostspageComponent } from './components/pages/hosts/component/hostspage/hostspage.component';
import { MatchespageComponent } from './components/pages/matches/component/matchespage/matchespage.component';
import { PlayoffspageComponent } from './components/pages/playoffs/component/playoffspage/playoffspage.component';
import { RulespageComponent } from './components/pages/rules/component/rulespage/rulespage.component';
import { StatespageComponent } from './components/pages/states/component/statespage/statespage.component';
import { ResultspageComponent } from './components/pages/results/component/resultspage/resultspage.component';
import { ControlTeamComponent } from './components/pages/teams/component/control-team/control-team.component';
import { ControlHostComponent } from './components/pages/hosts/component/control-host/control-host.component';
import { ControlGamblersComponent } from './components/pages/gamblers/component/control-gamblers/control-gamblers.component';
import { TournamentspageComponent } from './components/pages/tournaments/components/tournamentspage/tournamentspage.component';
import { ControlTournamentsComponent } from './components/pages/tournaments/components/control-tournaments/control-tournaments.component';
import { TeamsxtournamentComponent } from './components/pages/teamsxtournament/components/teamsxtournament/teamsxtournament.component';
import { BetgroupsComponent } from './components/pages/betgroups/components/betgroups/betgroups.component';
import { GamblersxgroupsComponent } from './components/pages/gamblerxgroups/components/gamblersxgroups/gamblersxgroups.component';

const routes: Routes = 
[  
{ path: '', component: HomepageComponent },
{ path: 'teams', component: TeamspageComponent },
{ path: 'bets', component: BetspageComponent },
{ path: 'gamblers', component: GamblerspageComponent },
{ path: 'groups', component: GroupspageComponent },
{ path: 'hosts', component: HostspageComponent },
{ path: 'matches', component: MatchespageComponent },
{ path: 'playoffs', component: PlayoffspageComponent },
{ path: 'ruleset', component: RulespageComponent },
{ path: 'states', component: StatespageComponent },
{ path: 'results', component: ResultspageComponent },
{ path: 'controlTeams', component: ControlTeamComponent },
{ path: 'controlHosts', component: ControlHostComponent },
{ path: 'controlGamblers', component: ControlGamblersComponent },
{ path: 'tournaments', component: TournamentspageComponent },
{ path: 'controlTournaments', component: ControlTournamentsComponent },
{ path: 'TeamsXTournaments', component: TeamsxtournamentComponent },
{ path: 'BettingGroups', component: BetgroupsComponent },
{ path: 'gamblersXGroups', component: GamblersxgroupsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
