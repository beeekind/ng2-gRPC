import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdToolbarModule, MdIconModule, MdListModule, MdCardModule } from '@angular/material';
import { routing } from './routing';

import { AppComponent } from './app';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //FormsModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdCardModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
