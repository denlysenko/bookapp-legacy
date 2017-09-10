import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AuthGuard } from "./guards/auth.guard";
// import { RoleGuard } from "./guards/role.guard";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { APP_CONFIG, appConfig } from "./config/app.config";
import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: appConfig
    },
    // AuthGuard,
    // RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
