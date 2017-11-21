import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {BotsRoutingModule} from "./bots-routing.module";
import {AlfredComponent} from "./alfred/alfred.component";
import {BotsComponent} from "./bots.component";
import {BotProfileComponent} from "./bot-profile/bot-profile.component";
import {RocketComponent} from "./rocket/rocket.component";

const components = [
  BotsComponent,
  AlfredComponent,
  RocketComponent,
  BotProfileComponent
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
    AlfredComponent,
  ],
})
export class BotsModule { }
