import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Navbar from '../components/Navbar'
import Icon from './Icon'

import './index.styl'

import { MapItem } from '../../falk/components'
import { object } from '../../falk/prototypes'
import { log, one, promise, type, task } from '../../falk/utilities'

/*
const test = ({ b }, a) => a.join(b)
console.log(new object())

task
	.bind({ b: 'blub' })
	.pipe(({}, a) => a.split('.'), test, log)
	.then(fun => fun('all.all'))
	.then(log)
	.catch(log)
*/
import joker from './joker.svg'

const Li = all => <li>{all}</li>

//const TemplateWrapper = ({ children }) => null
const TemplateWrapper = ({ children }) => (
	<div className="Body">
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
