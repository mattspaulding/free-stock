import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {StockRoutingModule} from "./stock-routing.module";
import {SearchComponent} from "./search/search.component";
import {StockComponent} from "./stock.component";

const components = [
  StockComponent,
  SearchComponent
];

@NgModule({
  imports: [
    ThemeModule,
    StockRoutingModule,
    ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    SearchComponent,
  ],
})
export class StockModule { }
