export function isObjectEmpty(object: any) {
   if (!object) return true
   return Object.keys(object).length === 0 && object.constructor === Object
} /* 

export const allObjectValuesFalsy = (object: any) => {
	if (isObjectEmpty(object)) return true;
	let keys = Object.keys(object);
	return keys.every((key) => {
		return !object[key] || (Array.isArray(object[key]) && object[key].length == 0);
	});
};

export const isObject = (val: any) => {
	if (val === null) {
		return false;
	}
	return typeof val === 'function' || typeof val === 'object';
};

export function removeNullValues(obj: any) {
	let copy = { ...obj };
	for (let key in copy) {
		if (obj[key] === null) delete copy[key];
	}
	return copy;
} */
