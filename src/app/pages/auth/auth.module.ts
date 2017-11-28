import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {LogoutComponent} from "./logout/logout.component";
import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from "./login/login.component";

const components = [
  AuthComponent,
  LogoutComponent,
  LoginComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    LoginComponent
  ],
})
export class AuthModule {
}
