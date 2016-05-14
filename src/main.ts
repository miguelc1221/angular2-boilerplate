import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent, APP_PROVIDERS } from './app';

function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...APP_PROVIDERS
  ])
  .catch(err => console.error(err));
}

if (process.env.NODE_ENV === 'production') {
    // bootstrap when documetn is ready
    enableProdMode();
    document.addEventListener('DOMContentLoaded', () => main());
} else {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
}
