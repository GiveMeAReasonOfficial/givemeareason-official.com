import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'

import Preview from './Preview'

CMS.registerPreviewStyle('/styles.css')

CMS.registerPreviewTemplate('pages', Preview)
