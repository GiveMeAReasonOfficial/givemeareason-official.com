import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Calendar from '../components/Calendar'

import './index.styl'
import './small.styl'

import { MapItem } from '../../falk/components'
import { object } from '../../falk/prototypes'
import { log, one, promise, type, task } from '../../falk/utilities'

import joker from './joker.svg'

const Li = all => <li>{all}</li>

//const TemplateWrapper = ({ children }) => null
const TemplateWrapper = ({ children }) => (
	<div className="Body">
		<Helmet title="Give Me a Reason" />
		<header className="Header">
			<img className="Logo" src={joker} />

			<a className="Center" href="#home">
				GIVE ME A REASON
			</a>
		</header>
		<main className="Main">
			<span id="home" />

			{children()}
		</main>
		<nav className="Navigation">
			<a href="#concerts">concerts</a>
			<a href="#about">about</a>
			<a href="#contact/booking">{'contact/booking'}</a>
		</nav>
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.func
}

export default TemplateWrapper
