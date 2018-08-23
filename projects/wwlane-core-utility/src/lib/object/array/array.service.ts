import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ArrayService {
	constructor() { }

	/**
	 * Returns whether the provided object is an instance of the provided type.
	 *
	 * @memberof ArrayService
	 */
	private isType(object: any, type: NumberConstructor): object is number;
	private isType(object: any, type: StringConstructor): object is string;
	private isType<T>(object: any, type: { prototype: T }): object is T;
	private isType(object: any, type: any): boolean {
		const objectType: string = typeof object;
		const typeString = type.toString();
		const nameRegex: RegExp = /Arguments|Function|String|Number|Date|Array|Boolean|RegExp/;

		let response = false;

		if (object && objectType === 'object') {
			response = object instanceof type;
		} else if (typeString.startsWith('class ')) {
			response = type.name.toLowerCase() === objectType;
		} else {
			const typeName: string = typeString.match(nameRegex);

			if (typeName) {
				response = typeName[0].toLowerCase() === objectType;
			}
		}

		return response;
	}

	/**
	 * Uses [isType]{@link ArrayService#isType} to determine if every element in the provided array is of the provided type.
	 * Returns false if the provided value is not an array or if the array is empty.
	 *
	 * @memberof ArrayService
	 */
	instancesOf(array: any, type: any): boolean {
		let response = false;

		if (Array.isArray(array)) {
			response = array.length > 0 && array.every(item => this.isType(item, type));
		}

		return response;
	}
}
