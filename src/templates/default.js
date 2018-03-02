import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'
import Calendar from '../components/Calendar'
import Icon from '../components/Icon'

export const BlogPostTemplate = ({ content, contentComponent }) => {
	const PostContent = contentComponent || Content

	return <PostContent content={content} />
}

export default ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<main>
			<h1 style={{ textAlign: 'center' }}>Melodic Punk Rock</h1>
			<div className="SocialMedia">
				<Icon fab="facebook" />
				<Icon fab="youtube" />
				<Icon fab="instagram" />
			</div>
			<h1>Concerts</h1>
			<Calendar events={data.contentYaml}>{data.contentYaml}</Calendar>
			<BlogPostTemplate content={post.html} contentComponent={HTMLContent} />
		</main>
	)
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
		contentYaml {
			altText
			event {
				date
				location
				name
				url
			}
		}
	}
`
