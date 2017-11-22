import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BotsComponent} from './bots.component';
import {AlfredComponent} from './alfred/alfred.component';
import {RocketComponent} from "./rocket/rocket.component";
import {OverviewComponent} from "./overview/overview.component";


const routes: Routes = [{
  path: '',
  component: BotsComponent,
  children: [
    {
      path: 'overview',
      component: OverviewComponent
    },
    {
      path: 'alfred',
      component: AlfredComponent
    },
    {
      path: 'rocket',
      component: RocketComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotsRoutingModule {
}
