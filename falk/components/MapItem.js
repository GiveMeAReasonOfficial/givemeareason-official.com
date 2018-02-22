import React, { createElement } from 'react'
import objectUnfreeze from 'object-unfreeze'
import object from '../prototypes/object'

const MapItem = props => {
	const { container, children } = props

	return createElement(
		container,
		props,
		children.props.children.map((cont, key) => {
			return children.type(cont) //.SetFreezed('props.key', key)

			//obj.props = { ...children.props, ...objectUnfreeze(obj.props) }
			//obj.props.key = key
		})
	)
}

export default MapItem
