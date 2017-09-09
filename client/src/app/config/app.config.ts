import { InjectionToken } from '@angular/core';
import { AppConfig } from "./AppConfig";

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  baseUrl: 'http://bookappserver-den2710.rhcloud.com'
};
