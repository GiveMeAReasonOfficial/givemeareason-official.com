const path = require('path')

exports.modifyWebpackConfig = ({ config, stage }) => {
	if (stage === 'build-html') {
		config.loader('null', {
			test: /Calendar/,
			loader: 'null-loader'
		})
	}
}

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						excerpt(pruneLength: 400)
						html
						id
						frontmatter {
							templateKey
							path
							title
							subtitle
						}
					}
				}
			}

			contentYaml {
				altText
				event {
					date
					location
					name
				}
			}
			allImageSharp {
				edges {
					node {
						sizes {
							srcSet
							sizes
						}
					}
				}
			}
		}
	`).then((result) => {
		if (result.errors) {
			result.errors.forEach((e) => console.error(e.toString()))
			return Promise.reject(result.errors)
		}

		return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			const pagePath = node.frontmatter.path
			createPage({
				path: pagePath,
				component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
				// additional data can be passed via context
				context: {
					path: pagePath
				}
			})
		})
	})
}

const addIDs = (string, index) => {
	if (index) {
		let lines = string.split('\n')
		lines[0] = `<h1 id="${lines[0]}">${lines[0]}</h1>`
		return lines.join('\n')
	} else {
		return string
	}
}

var first = true
exports.onCreateNode = ({ node, boundActionCreators }) => {
	const { createNode, createNodeField } = boundActionCreators
	// Transform the new node here and create a new node or

	// create a new node field.
	//console.log(node.internal.type)

	if (node.internal.type === 'MarkdownRemark') {
		if (first) {
			console.log('\x1b[34m', '\n created pages')
			first = false
		}
		console.log('\x1b[34m', node.frontmatter.path)
		node.internal.content = node.internal.content.split('\n# ').map(addIDs).join('\n')
		//node.internal.content = Mark({ children: node.internal.content, markups })
	}
}
