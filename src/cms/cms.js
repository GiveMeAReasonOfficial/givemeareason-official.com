import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'

import React from 'react'
import ReactDOM from 'react-dom'

import './cms.css'

import Preview from './Preview'

ReactDOM.createPortal(
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />,
	document.getElementsByTagName('HEAD')[0]
)

CMS.registerPreviewStyle('/styles.css')

CMS.registerPreviewTemplate('pages', Preview)
