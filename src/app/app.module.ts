import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WwLaneCoreUtilityModule } from 'wwlane-core-utility';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		WwLaneCoreUtilityModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
