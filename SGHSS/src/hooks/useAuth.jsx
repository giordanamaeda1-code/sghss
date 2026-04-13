import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData'; // Importa dados fictícios para teste

// O Contexto é como uma "nuvem" de informações que todos os componentes podem acessar
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para guardar o usuário logado
  const [loading, setLoading] = useState(true); // Estado para saber se ainda está carregando os dados

  // O useEffect roda assim que o sistema abre
  useEffect(() => {
    // Tenta buscar se já existe um usuário salvo no navegador (localStorage)
    const savedUser = localStorage.getItem('sghss_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Se achou, "loga" o usuário automaticamente
    }
    setLoading(false);
  }, []);

  // Função para fazer login
  const login = (email, password, role) => {
    // Procura o usuário na nossa lista de teste (mockData)
    const foundUser = users.find(u => u.email === email && u.password === password && u.role === role);
    if (foundUser) {
      setUser(foundUser); // Salva o usuário no estado
      localStorage.setItem('sghss_user', JSON.stringify(foundUser)); // Salva no navegador para não deslogar ao dar F5
      return true;
    }
    return false;
  };

  // Função para sair do sistema
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sghss_user'); // Limpa os dados do navegador
  };

  // Função para cadastrar um novo usuário (fictício)
  const register = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUser(newUser);
    localStorage.setItem('sghss_user', JSON.stringify(newUser));
    return true;
  };

  // Função para atualizar os dados do perfil
  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('sghss_user', JSON.stringify(updatedUser));
    return true;
  };

  return (
    // Disponibiliza as funções e o usuário para todo o projeto
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso da autenticação nos componentes
export const useAuth = () => useContext(AuthContext);

// Hook para verificar facilmente se o usuário é médico ou paciente
export const useUserRole = () => {
  const { user } = useAuth();
  return {
    isPatient: user?.role === 'paciente',
    isDoctor: user?.role === 'medico',
    role: user?.role
  };
};
