import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/componentes/header/header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [BrowserModule, MatIconModule],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}
