import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {BotsRoutingModule} from './bots-routing.module';
import {BrunoComponent} from './bruno/bruno.component';
import {BotsComponent} from './bots.component';
import {BotProfileComponent} from './bot-profile/bot-profile.component';
import {RocketComponent} from './rocket/rocket.component';
import {OverviewComponent} from './overview/overview.component';
import {GeoffreyComponent} from './geoffrey/geoffrey.component';
import {DotComponent} from './dot/dot.component';
import {StopLossComponent} from './geoffrey/stop-loss/stop-loss.component';
import {StopLossDraggerComponent} from './geoffrey/stop-loss/stop-loss-dragger/stop-loss-dragger.component';

const components = [
  BotsComponent,
  OverviewComponent,
  BrunoComponent,
  GeoffreyComponent,
  DotComponent,
  RocketComponent,
  BotProfileComponent,
  StopLossComponent,
  StopLossDraggerComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BotsRoutingModule,
    ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    BrunoComponent,
  ],
})
export class BotsModule { }
