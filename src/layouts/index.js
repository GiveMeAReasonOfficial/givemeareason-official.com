import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { flow } from 'lodash'

import Navbar from '../components/Navbar'
import Calendar from '../components/Calendar'

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

/*const getIMGObject = url =>
new Promise((resolve, reject) => {
	var img = new Image()
	img.onload = function() {
		console.log(this.naturalHeight)
		return resolve({
			src: url,
			width: 1,
			height: this.naturalHeight / this.naturalWidth
		})
	}
	img.src = url
})

*/

class App extends React.Component {
	constructor() {
		super()
		this.state = { currentImage: 0, photos: [] }
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
	componentWillMount = () => {
		//getIMGObject('https://source.unsplash.com/iecJiKe_RNg/600x799').then(obj =>
		//this.setState({ photos: [obj, obj, obj, obj, obj], containerWidth: 400 })
		//)
	}
	render() {
		return (
			<div className="test">
				<Gallery
					photos={this.state.photos}
					onClick={this.openLightbox}
					columns={Math.ceil(this.state.photos.length / 2)}
				/>
				<Lightbox
					images={this.state.photos}
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

			{children()}
		</main>
		<nav className="Navigation">contact booking</nav>
	</div>
)

TemplateWrapper.propTypes = {
	children: PropTypes.func
}

export default TemplateWrapper
