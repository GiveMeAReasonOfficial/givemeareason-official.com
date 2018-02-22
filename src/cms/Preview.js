import React from 'react'
import { BlogPostTemplate } from '../templates/default'

const Preview = ({ entry, widgetFor }) => (
	<div className="Body">
		<main className="Main Preview">
			<BlogPostTemplate content={widgetFor('body')} />
		</main>
	</div>
)

export default Preview
