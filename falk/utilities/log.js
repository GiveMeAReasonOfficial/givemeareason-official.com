import StackTrace from 'stacktrace-js'

const logError = (error, index) =>
	StackTrace.fromError(error).then(trace => {
		console.group(index, error.message)
		console.error(
			'position:',
			`@ ${trace[0].fileName.replace('webpack:///', '').split('?')[0]}
@ ${trace[0].functionName}
@ line ${trace[0].lineNumber}`
		)
		console.error('cause:', error.cause)
		console.groupEnd()
	})

const logOne = (single, index) => {
	if (typeof single.message === 'undefined') {
		console.log(single)
	} else {
		logError(single, index)
	}
}

const log = all => {
	if (Array.isArray(all)) {
		all.map(logOne)
	} else {
		logOne(all)
	}
}

export default log
