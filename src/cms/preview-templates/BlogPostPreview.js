import React from 'react'
import { BlogPostTemplate } from '../../templates/default'

const BlogPostPreview = ({ entry, widgetFor }) => <BlogPostTemplate content={widgetFor('body')} />

export default BlogPostPreview
