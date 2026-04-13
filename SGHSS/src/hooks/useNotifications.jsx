import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { notifications as initialNotifications } from '../data/mockData';
import { useAuth } from './useAuth';

// O Contexto de Notificações é como uma central de avisos para todo o sistema
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]); // Lista de notificações na central
  const [unreadCount, setUnreadCount] = useState(0); // Contador de bolinha vermelha no sino
  const [toasts, setToasts] = useState([]); // Lista de alertas flutuantes que aparecem no canto

  // Sempre que o usuário loga ou desloga, buscamos as notificações dele
  useEffect(() => {
    if (user) {
      const userNotifications = initialNotifications.filter(n => n.userId === user.id);
      setNotifications(userNotifications);
      setUnreadCount(userNotifications.filter(n => !n.isRead).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Função para marcar um aviso como lido
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Função para limpar todas as notificações não lidas de uma vez
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  // Função para criar uma nova notificação na central
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      isRead: false,
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Remove o alerta flutuante da tela
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Função principal para mostrar aquele balãozinho de "Sucesso" ou "Erro" no canto da tela
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    // O alerta some sozinho depois de 5 segundos
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      toasts,
      showToast,
      removeToast
    }}>
      {children}

      {/* Área onde os Alertas Flutuantes (Toasts) são desenhados por cima de tudo */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              min-w-[280px] max-w-md p-4 rounded-lg shadow-2xl border flex items-center gap-3 
              animate-in slide-in-from-right fade-in duration-300 pointer-events-auto
              ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}
              ${toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
              ${toast.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : ''}
              ${toast.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
            `}
          >
            <div className="flex-1 text-sm font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-4 h-4 opacity-50" size={16} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Hook simples para usar as notificações em qualquer lugar do projeto
export const useNotifications = () => useContext(NotificationContext);
