import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FinanzasApp } from './FinanzasApp'
import { ClaraApp } from './ClaraApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <FinanzasApp /> */}
    <ClaraApp />
  </StrictMode>,
)
