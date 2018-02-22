import { get, set, mapValues } from 'lodash'
import unfreeze from 'object-unfreeze'

class object extends Object {
	//construnctor() {}
	Get = (...args) => {
		return get(this, ...args)
	}

	Set = (...args) => {
		return set(this, ...args)
	}

	SetFreezed = (path, value) => {
		console.log(this)
		let ob = unfreeze(this)
		getCascade(path).map(p => {
			set(ob, p, unfreeze(get(ob, p, {})))
		})

		return set(ob, path, value)
	}

	getCascade = path => {
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

	Map = (f, pos) => {
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
}
export default object
