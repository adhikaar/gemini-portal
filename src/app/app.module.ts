import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DataTableModule } from "angular-6-datatable";
import { MaterialcomponentsModule } from '@app/materialcomponents/materialcomponents.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailOrPhoneValidator } from '@app/directives/emailorphone.directive';
import { EmailValidator } from '@app/directives/validemail.directive';
import { PhoneValidator } from '@app/directives/validphone.directive';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { WINDOW_PROVIDERS } from "@app/window.service";

import { AppComponent } from '@app/app.component';

import { AuthGuard } from '@app/auth-guard.service';
import { LoggedinGuard } from '@app/loggedin-guard.service';
import { NavigationGuard } from '@app/navigation-guard.service';

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { DeleteUserDialog } from './app-dashboard/app-dashboard.component';
import { AppAuthComponent } from './app-auth/app-auth.component';
import { AppUserComponent } from './app-user/app-user.component';
import { AppReadmeComponent } from './app-readme/app-readme.component';

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any> {
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
}


@NgModule({
  declarations: [
    AppComponent,
    EmailOrPhoneValidator,
    EmailValidator,
    PhoneValidator,
    AppNavbarComponent,
    AppFooterComponent,
    AppDashboardComponent,
    DeleteUserDialog,
    AppAuthComponent,
    AppUserComponent,
    AppReadmeComponent,
  ],
  entryComponents: [
    DeleteUserDialog,
    ],
  imports: [
    BrowserModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    BrowserAnimationsModule,
    MaterialcomponentsModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component:AppAuthComponent, canActivate: [LoggedinGuard] },
      { path: 'dashboard', component: AppDashboardComponent, canActivate: [AuthGuard] },
      { path: 'auth', component: AppAuthComponent, canActivate: [LoggedinGuard] },
      { path: 'readme', component: AppReadmeComponent },
      { path: 'user/:phone', component: AppUserComponent, canActivate: [AuthGuard, NavigationGuard] },
    ], {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthGuard,
    LoggedinGuard,
    NavigationGuard,
    WINDOW_PROVIDERS,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
