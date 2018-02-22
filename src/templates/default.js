import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({ content, contentComponent }) => {
	const PostContent = contentComponent || Content

	return (
		<main className="Main">
			<PostContent content={content} />
		</main>
	)
}

export default ({ data }) => {
	const { markdownRemark: post } = data

	return <BlogPostTemplate content={post.html} contentComponent={HTMLContent} />
}

export const pageQuery = graphql`
	query BlogPostByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`
