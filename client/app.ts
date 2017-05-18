import { Component } from '@angular/core';

const template = require('./app.jade')({});

@Component({
  selector: 'app',
  styleUrls: ['./app.css'],
  template: template
})
export class AppComponent {}
