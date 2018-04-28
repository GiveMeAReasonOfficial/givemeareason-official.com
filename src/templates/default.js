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

	console.log(7.1)

	return <main />
}

console.log(7.5)

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
