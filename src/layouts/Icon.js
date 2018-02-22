import { Component, createElement } from 'react'
import './Icon.styl'

export default class Icon extends Component {
	render() {
		let props = { ...this.props }
		let className = ''
		if (typeof this.props.className !== 'undefined') {
			className = this.props.className
		}
		if (typeof this.props.material !== 'undefined') {
			props.className = `Falk Icon material-icons ${className}`
			props.children = this.props.material
		}
		if (typeof this.props.ion !== 'undefined') {
			props.className = `Falk Icon ion-${this.props.ion} ${className}`
		}
		if (typeof this.props.fas !== 'undefined') {
			props.className = `Falk Icon fas fa-${this.props.fas} ${className}`
		}
		if (typeof this.props.fab !== 'undefined') {
			props.className = `Falk Icon fab fa-${this.props.fab} ${className}`
		}

		props['aria-hidden'] = 'true'
		return createElement('i', props)
	}
}
