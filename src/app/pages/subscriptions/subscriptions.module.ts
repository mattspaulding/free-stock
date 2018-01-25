import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {SubscriptionsComponent} from './subscriptions.component';

const components = [
  SubscriptionsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
})
export class SubscriptionsModule {
}
