import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BotsComponent} from './bots.component';
import {BrunoComponent} from './bruno/bruno.component';
import {RocketComponent} from './rocket/rocket.component';
import {PutComponent} from './put/put.component';
import {OverviewComponent} from './overview/overview.component';
import {SwingComponent} from './swing/swing.component';
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
      path: 'swing',
      component: SwingComponent,
    },
    {
      path: 'swing/:symbol',
      component: SwingComponent,
    },
    {
      path: 'rocket',
      component: RocketComponent,
    },
    {
      path: 'put',
      component: PutComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotsRoutingModule {
}
