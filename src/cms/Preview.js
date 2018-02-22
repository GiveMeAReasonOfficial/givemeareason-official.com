import React from 'react'
import { BlogPostTemplate } from '../templates/default'

const Preview = ({ entry, widgetFor }) => (
	<div className="Body">
		<BlogPostTemplate content={widgetFor('body')} />
	</div>
)

export default Preview
