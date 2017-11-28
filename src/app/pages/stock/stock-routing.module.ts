import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockComponent} from './stock.component';
import {SearchComponent} from './search/search.component';
import {ActiveInvestmentsComponent} from "./active-investments/active-investments.component";
import {StrategiesComponent} from "./strategies/strategies.component";



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
      path: 'active-investments',
      component: ActiveInvestmentsComponent,
    },
    {
      path: 'strategies',
      component: StrategiesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {
}
