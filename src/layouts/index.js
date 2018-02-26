import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Navbar from '../components/Navbar'
import Calendar from '../components/Calendar'
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

import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'

const photos = [
	{ src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
	{ src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
	{ src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
	{ src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
	{ src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 }
]

class App extends React.Component {
	constructor() {
		super()
		this.state = { currentImage: 0 }
		this.closeLightbox = this.closeLightbox.bind(this)
		this.openLightbox = this.openLightbox.bind(this)
		this.gotoNext = this.gotoNext.bind(this)
		this.gotoPrevious = this.gotoPrevious.bind(this)
	}
	openLightbox(event, obj) {
		this.setState({
			currentImage: obj.index,
			lightboxIsOpen: true
		})
	}
	closeLightbox() {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false
		})
	}
	gotoPrevious() {
		this.setState({
			currentImage: this.state.currentImage - 1
		})
	}
	gotoNext() {
		this.setState({
			currentImage: this.state.currentImage + 1
		})
	}
	render() {
		return (
			<div className="test">
				<Gallery
					photos={photos}
					onClick={this.openLightbox}
					columns={Math.ceil(photos.length / 2)}
				/>
				<Lightbox
					images={photos}
					onClose={this.closeLightbox}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					currentImage={this.state.currentImage}
					isOpen={this.state.lightboxIsOpen}
				/>
			</div>
		)
	}
}

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
			<App />

			<h1 style={{ color: 'white', textAlign: 'center' }}>Melodic Punk Rock</h1>
			<div className="SocialMedia">
				<Icon fab="facebook" />
				<Icon fab="youtube" />
				<Icon fab="instagram" />
			</div>
			<Calendar />
			{children()}
		</main>
		<nav className="Navigation">contact booking</nav>
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.func
}

export default TemplateWrapper
