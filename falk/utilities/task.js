import { mapKeys, flow } from 'lodash'

const pipe = function(...args) {
	const bindings = this.bindings
	const promise = new Promise(function(resolve, reject) {
		try {
			const args2 = args.map(arg => arg.bind(null, bindings))
			return resolve(flow(...args2))
		} catch (error) {
			return reject(error)
		}
	})

	return { ...this, promise }
}

const bind = function(bindings) {
	this.bindings = bindings
	mapKeys(bindings, (el, key) => {
		if (typeof el === 'function') {
			this.bindings[key] = el.bind(null, this.bindings)
		} else {
			this.bindings[key] = el
		}
	})
	return this
}

const then = function(fun) {
	this.promise = this.promise.then(
		(...args) =>
			new Promise((resolve, reject) => {
				try {
					return resolve(fun(...args))
				} catch (error) {
					return reject(error)
				}
			})
	)
	return this
}

const _catch = function(fun) {
	this.promise.catch(fun)
	return this
}

export default { bind, pipe, then, catch: _catch }
