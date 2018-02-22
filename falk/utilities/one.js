import StackTrace from 'stacktrace-js'

import promise from './promise'

const tryFunction = f => {
	try {
		return { resolved: true, object: f() }
	} catch (error) {
		error.cause = f
		return { resolved: false, object: error }
	}
}

const mapFunctions = ({ resolve, reject }, functions, index = -1, errors = []) => {
	++index

	if (index < functions.length) {
		const { resolved, object } = tryFunction(functions[index])
		if (resolved) {
			return resolve(object)
		} else {
			errors.push(object)
			return mapFunctions({ resolve, reject }, functions, index, errors)
		}
	} else {
		return reject(errors)
	}
}

const one = (...functions) => promise(mapFunctions)(functions)

export default one
