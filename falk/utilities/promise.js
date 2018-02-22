const promise = fn => (...args) =>
	new Promise((resolve, reject) => fn({ resolve, reject }, ...args))

export default promise
