import React, { Component } from 'react'

import PhotoGallery from 'react-photo-gallery'
import Lightbox from 'react-images'

export default class Gallery extends Component {
	constructor(props) {
		super()

		this.state = { currentImage: 0, columns: Math.ceil(props.photos.length / 2) }
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
