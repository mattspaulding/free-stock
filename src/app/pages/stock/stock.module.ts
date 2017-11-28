import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {StockRoutingModule} from './stock-routing.module';
import {SearchComponent} from './search/search.component';
import {StockComponent} from './stock.component';
import {ActiveInvestmentsComponent} from "./active-investments/active-investments.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {StrategiesComponent} from "./strategies/strategies.component";

const components = [
  StockComponent,
  SearchComponent,
  ActiveInvestmentsComponent,
  StrategiesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    StockRoutingModule,
    Ng2SmartTableModule,
    ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    SearchComponent
  ],
})
export class StockModule { }
