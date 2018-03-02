import React, { Component } from 'react'

import PhotoGallery from 'react-photo-gallery'
import Lightbox from 'react-images'

export default class Gallery extends Component {
	constructor(props) {
		super()
		const rows = {
			2: Math.ceil(props.photos.length / 2),
			3: Math.ceil(props.photos.length / 3)
		}
		this.state = { currentImage: 0, rows, column: 2 }
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
		const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		const h =
			window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

		let columns
		if (w * 1.5 > h) {
			columns = this.state.rows[2]
		} else {
			columns = this.state.rows[3]
		}
		console.log(columns)
		if (this.state.columns !== columns) {
			this.setState({ columns })
		}
		//
	}

	render() {
		return (
			<div className="Gallery">
				<PhotoGallery
					photos={this.props.photos}
					onClick={this.openLightbox}
					columns={this.state.columns}
				/>
				<Lightbox
					images={this.props.photos}
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
