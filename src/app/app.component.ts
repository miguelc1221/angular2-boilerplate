import { Component } from '@angular/core';
import { AppState } from './app.service';


@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})

export class AppComponent {
    constructor(public appState: AppState) { }
}
