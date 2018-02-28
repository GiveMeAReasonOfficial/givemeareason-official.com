import React, { Component } from 'react'
import CMS from 'netlify-cms'
import ContentEditable from 'react-contenteditable'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true })
		// You can also log the error to an error reporting service
		logErrorToMyService(error, info)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>
		}
		return this.props.children
	}
}

const Cells = ({ fields }) =>
	fields.map(field => {
		const Widget = CMS.getWidget('list').control

		const prop = {
			label: 'Puppy Count',
			name: 'puppies',
			default: 2,
			valueType: 'int',
			min: 1,
			max: 101
		}

		//const prop = console.log(field.map((...all) => all))
		return (
			<td>
				<Widget />
			</td>
		)
	})

class Control extends Component {
	render() {
		console.log()
		return (
			<table>
				<tr>
					<Cells fields={this.props.field.get('fields')} />
					<td>
						<div contentEditable="true">I editable</div>
					</td>
					<td>
						<ContentEditable
							onChange={({ target }) => console.log(target.value)}
							html={'default'}
						/>
					</td>
				</tr>
			</table>
		)
	}
}

const View = () => <div />

const all = ['line', Control, View]

export default all
