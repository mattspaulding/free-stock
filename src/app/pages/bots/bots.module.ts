import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {BotsRoutingModule} from './bots-routing.module';
import {BrunoComponent} from './bruno/bruno.component';
import {BotsComponent} from './bots.component';
import {BotProfileComponent} from './bot-profile/bot-profile.component';
import {RocketComponent} from './rocket/rocket.component';
import {PutComponent} from './put/put.component';
import {OverviewComponent} from './overview/overview.component';
import {GeoffreyComponent} from './geoffrey/geoffrey.component';
import {SwingComponent} from './swing/swing.component';
import {StopLossComponent} from './geoffrey/stop-loss/stop-loss.component';
import {StopLossDraggerComponent} from './geoffrey/stop-loss/stop-loss-dragger/stop-loss-dragger.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ToasterModule} from 'angular2-toaster';

const components = [
  BotsComponent,
  OverviewComponent,
  BrunoComponent,
  GeoffreyComponent,
  SwingComponent,
  RocketComponent,
  PutComponent,
  BotProfileComponent,
  StopLossComponent,
  StopLossDraggerComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    BotsRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    BrunoComponent,
  ],
})
export class BotsModule { }
