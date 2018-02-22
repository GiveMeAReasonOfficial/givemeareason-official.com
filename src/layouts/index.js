import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Navbar from '../components/Navbar'
import Icon from './Icon'

import './index.styl'

import { MapItem } from '../../falk/components'
import { Object } from '../../falk/prototypes'
import { log, one, promise, type } from '../../falk/utilities'

one('bla', () => 'bökö')
	.then(log)
	.catch(log)
console.log('bla')

console.log({ a: [11, 12], bs: 'as' }.Map((a, b) => a + b, 'a'))

flow(() => 'bökö', a => a + 'bökö', log)()

import joker from './joker.svg'

const Li = all => <li>{all}</li>

//const TemplateWrapper = ({ children }) => null
const TemplateWrapper = ({ children }) => (
	<div className="Body">
		<MapItem container="ul">
			<Li className="blue">{['bla', 'blu', 'blub']}</Li>
		</MapItem>

		<Helmet title="Give Me a Reason" />
		<header className="Header">
			<img className="Logo" src={joker} />
			<div className="Center">GIVE ME A REASON</div>
		</header>
		<main className="Main">
			<img
				className="Pic"
				src="http://givemeareason-official.com/static/media/title.850341b1.jpg"
			/>
			<h1 style={{ color: 'white', textAlign: 'center' }}>Melodic Punk Rock</h1>
			<div className="SocialMedia">
				<Icon fab="facebook" />
				<Icon fab="youtube" />
				<Icon fab="instagram" />
			</div>
			{children()}
		</main>
		<nav className="Navigation">contact booking</nav>
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.func
}

export default TemplateWrapper
