import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockComponent} from './stock.component';
import {SearchComponent} from './search/search.component';



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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {
}
