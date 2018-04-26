import React from 'react'

export default ({ content, className }) => <div className={className}>{content}</div>
const HTMLContent = ({ content, className }) => (
	<div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

export { HTMLContent }
