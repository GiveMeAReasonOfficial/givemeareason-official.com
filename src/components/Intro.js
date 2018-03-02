import React from 'react'

import Icon from './Icon'
import Gallery from './Gallery'

const SocialMedia = () => (
	<div className="SocialMedia">
		<a href="https://www.facebook.com/GiveMeAReasonOfficial" target="_blank">
			<Icon fab="facebook" />
		</a>
		<a href="https://www.youtube.com/channel/UCCMwf_diPCwrFHMdAhFVBWg" target="_blank">
			<Icon fab="youtube" />
		</a>
		<a href="https://www.instagram.com/givemeareason_official/" target="_blank">
			<Icon fab="instagram" />
		</a>
	</div>
)

const Intro = ({ photos, subtitle }) => (
	<div className="Intro" id="home">
		<Gallery photos={photos} />
		<h1 style={{ textAlign: 'center' }}>{subtitle}</h1>
		<SocialMedia />
	</div>
)

export default Intro
