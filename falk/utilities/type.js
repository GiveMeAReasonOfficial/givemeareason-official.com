const type = (a, b = undefined, t = true, f = false) => {
	const typeA = typeof a
	const typeB = typeof b
	if (typeA === 'object' && typeB === 'object') {
		const otypeA = Array.isArray(a)
		const otypeB = Array.isArray(b)
		if (otypeA === otypeB) {
			return t
		} else if (!otypeA === !otypeB) {
			return t
		} else {
			return f
		}
	}
	if (typeA === typeB) {
		return t
	} else {
		return f
	}
}

export default type
