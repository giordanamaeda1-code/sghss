import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Este componente funciona como um "pedágio": ele verifica se o usuário tem permissão para entrar na página
const ProtectedRoute = ({ 
  allowedRoles = [] // Lista de cargos que podem acessar a rota (ex: ['medico'])
}) => {
  const { user, loading } = useAuth(); // Pega o usuário logado e o status de carregamento

  // Enquanto o sistema está verificando se existe um usuário no localStorage, mostra uma tela de espera
  if (loading) return <div>Carregando...</div>;

  // Se NÃO houver usuário logado, manda ele direto para a página de Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota for só para médicos e o usuário for paciente (ou vice-versa), manda ele de volta para a Home
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Se estiver tudo OK (logado e com o cargo certo), o Outlet renderiza a página que ele tentou acessar
  return <Outlet />;
};

export default ProtectedRoute;
