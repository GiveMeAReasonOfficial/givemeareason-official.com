import { get, set, mapValues } from 'lodash'
import unfreeze from 'object-unfreeze'

Object.prototype.Get = function(...args) {
	return get(this, ...args)
}

Object.prototype.Set = function(...args) {
	return set(this, ...args)
}

Object.prototype.SetFreezed = function(path, value) {
	console.log(this)
	let ob = unfreeze(this)
	getCascade(path).map(p => {
		set(ob, p, unfreeze(get(ob, p, {})))
	})

	return set(ob, path, value)
}

const getCascade = path => {
	let cascade = []
	path.split('.').map((name, index) => {
		if (index) {
			cascade.push(cascade[index - 1] + '.' + name)
		} else {
			cascade.push(name)
		}
	})
	return cascade
}

Object.prototype.Map = function(f, pos) {
	let object
	if (pos) {
		object = this.Get(pos)
	} else {
		object = this
	}
	return mapValues(object, f)
	/*Object.keys(obj).forEach(function(key) {
		fn(obj[key], key)
	})*/
}

export default Object
