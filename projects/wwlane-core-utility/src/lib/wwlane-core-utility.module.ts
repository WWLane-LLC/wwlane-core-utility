import { NgModule, ModuleWithProviders } from '@angular/core';

import { ObjectPropertyService } from './object-property/object-property.service';

@NgModule({
	imports: [
	],
	declarations: [
	],
	exports: [
	]
})
export class WwLaneCoreUtilityModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: WwLaneCoreUtilityModule,
			providers: [
				ObjectPropertyService
			]
		};
	}
}
