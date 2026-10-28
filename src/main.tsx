// Global styles first, so component styles (imported by App) can build on them.
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/ui.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Missing <div id="root"> in index.html')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
