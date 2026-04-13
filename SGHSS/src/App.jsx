import React from 'react';
import Router from './Router'; // Importa o arquivo que decide qual página mostrar
import { AuthProvider } from './hooks/useAuth'; // Gerencia se o usuário está logado
import { NotificationProvider } from './hooks/useNotifications'; // Gerencia as mensagens de alerta/sucesso
import './index.css';

function App() {
  return (
    // O AuthProvider "envolve" tudo para que todas as páginas saibam se o usuário tem acesso
    <AuthProvider>
      <NotificationProvider>
        {/* Aqui dentro as rotas são carregadas conforme o que o usuário clica */}
        <Router />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
