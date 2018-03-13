import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BotsComponent} from './bots.component';
import {BrunoComponent} from './bruno/bruno.component';
import {RocketComponent} from './rocket/rocket.component';
import {OverviewComponent} from './overview/overview.component';
import {DotComponent} from './dot/dot.component';
import {GeoffreyComponent} from './geoffrey/geoffrey.component';


const routes: Routes = [{
  path: '',
  component: BotsComponent,
  children: [
    {
      path: 'overview',
      component: OverviewComponent,
    },
    {
      path: 'bruno',
      component: BrunoComponent,
    },
    {
      path: 'geoffrey',
      component: GeoffreyComponent,
    },
    {
      path: 'dot',
      component: DotComponent,
    },
    {
      path: 'dot/:symbol',
      component: DotComponent,
    },
    {
      path: 'rocket',
      component: RocketComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotsRoutingModule {
}
