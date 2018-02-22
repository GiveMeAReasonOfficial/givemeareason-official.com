import React from 'react'
import { BlogPostTemplate } from '../templates/default'

const Preview = ({ entry, widgetFor }) => <BlogPostTemplate content={widgetFor('body')} />

export default Preview
