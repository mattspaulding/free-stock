import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockComponent} from './stock.component';
import {SearchComponent} from './search/search.component';
import {ActiveInvestmentsComponent} from "./active-investments/active-investments.component";
import {StrategiesComponent} from "./strategies/strategies.component";
import {CompletedInvestmentsComponent} from "./completed-investments/completed-investments.component";



const routes: Routes = [{
  path: '',
  component: StockComponent,
  children: [
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'search/:symbol',
      component: SearchComponent,
    },
     {
      path: 'strategies',
      component: StrategiesComponent,
    },
    {
      path: 'active-investments',
      component: ActiveInvestmentsComponent,
    },
    {
      path: 'completed-investments',
      component: CompletedInvestmentsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {
}
