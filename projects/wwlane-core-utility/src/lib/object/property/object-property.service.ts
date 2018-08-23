import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ObjectPropertyService {
	constructor() { }

	private retrievePropertyByPropertyNameChain(object: Object, propertyNames: string[]): Object {
		const property = propertyNames.shift();

		let nextObject = null;
		const bracketIndex = property.indexOf('[');

		if (bracketIndex > -1) {
			nextObject = object[property.substring(0, bracketIndex)][property.substring(bracketIndex + 1, property.indexOf(']'))];
		} else {
			nextObject = object[property];
		}

		return this.retrievePropertyOrPropertiesByPropertyNameChain(nextObject, propertyNames);
	}

	private retrievePropertiesByPropertyNameChain(objects: Object[], propertyNames: string[]): Object[] {
		const response: Object[] = [];

		for (const object of objects) {
			const propertyNamesClone = Object.assign([], propertyNames);

			response.push(this.retrievePropertyOrPropertiesByPropertyNameChain(object, propertyNamesClone));
		}

		return response;
	}

	private retrievePropertyOrPropertiesByPropertyNameChain(object: Object | Object[], propertyNames: string[]): Object | Object[] {
		let response: Object | Object[];

		if (propertyNames.length > 0 && object !== undefined && object !== null) { // && !(object instanceof InaccessibleProperty)) {
			if (Array.isArray(object)) {
				response = this.retrievePropertiesByPropertyNameChain(object, propertyNames);
			} else {
				response = this.retrievePropertyByPropertyNameChain(object, propertyNames);
			}
		} else {
			response = object;
		}

		return response;
	}

	retrievePropertyByName(object: Object, propertyName: string): Object | Object[] {
		let response = object;

		if (propertyName !== undefined) {
			const propertyNames = propertyName.split('.');

			response = this.retrievePropertyOrPropertiesByPropertyNameChain(object, propertyNames);
		}

		return response;
	}

	parseValueUsingObject(object: Object, value: string): Object {
		let response: Object;

		// if (value instanceof FunctionCall) {
		// 	response = parseFunctionCallUsingObject(object, value);
		// } else {
			response = this.retrievePropertyByName(object, value);
		// }

		return response;
	}

	parseValuesUsingObject(object: Object, values: string[]): Object[] {
		const response: Object[] = [];
		for (let x = 0; x < values.length; x++) {
			response.push(this.parseValueUsingObject(object, values[x]));
		}

		return response;
	}
}
