import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Calendar from '../components/Calendar'

import './index.styl'
import './small.styl'

//import { MapItem } from '../../falk/components'
//import { object } from '../../falk/prototypes'
//import { log, one, promise, type, task } from '../../falk/utilities'

import joker from './joker.svg'

const Li = (all) => <li>{all}</li>

//const TemplateWrapper = ({ children }) => null

console.log(1)

const TemplateWrapper = ({ children }) => (
	<div className="Body">
		<Helmet title="Give Me a Reason" />
		{console.log(2)}
		<header className="Header">
			<a className="Title" href="#home">
				GIVE ME A REASON
			</a>
			<nav className="Navigation">
				<a href="#concerts">concerts</a>
				<a href="#about">about</a>
				<a href="#contact/booking">{'contact/booking'}</a>
			</nav>
		</header>
		{console.log(3)}
		<main className="Main">
			<span id="home" />

			{children()}
		</main>
		{console.log(5)}
		<img className="Logo" src={joker} />
	</div>
)

console.log(6)

TemplateWrapper.propTypes = {
	children: PropTypes.func
}

export default TemplateWrapper
