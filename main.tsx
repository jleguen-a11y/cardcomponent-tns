import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CardProjetDemo from './CardProjetDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardProjetDemo />
  </StrictMode>,
)
