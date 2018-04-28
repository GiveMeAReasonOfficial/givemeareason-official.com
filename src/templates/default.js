import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'

import Intro from '../components/Intro'
import Calendar from '../components/Calendar'

export const BlogPostTemplate = ({ content, contentComponent }) => {
	const PostContent = contentComponent || Content

	return <PostContent content={content} />
}

export default ({ data }) => {
	const { markdownRemark: post } = data

	const photos = data.allImageSharp.edges.map(
		({ node: { sizes: { src, srcSet, sizes, aspectRatio } } }) => ({
			srcSet: srcSet.split(','),
			src,
			sizes: [sizes],
			width: aspectRatio,
			height: 1
		})
	)

	//console.log(photos)

	return (
		<main>
			<Intro subtitle={data.markdownRemark.frontmatter.subtitle} photos={photos} />
			<h1 id="concerts">concerts</h1>

			<Calendar events={data.contentYaml} />
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
				subtitle
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
		allImageSharp {
			edges {
				node {
					sizes {
						src
						srcSet
						sizes
						aspectRatio
					}
				}
			}
		}
	}
`
