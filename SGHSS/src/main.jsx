import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importa o CSS global do projeto
import App from './App.jsx' // Importa o componente principal que carrega tudo

// Aqui o React busca o elemento 'root' lá no index.html para desenhar o sistema nele
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* O StrictMode ajuda a encontrar problemas no código durante o desenvolvimento */}
    <App />
  </StrictMode>,
)
