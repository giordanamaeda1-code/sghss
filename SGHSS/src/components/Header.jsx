import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Check, Info, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

// O Header é a barra superior que fica fixa no topo após o usuário logar
const Header = () => {
  // Pegamos os dados do usuário e a função de deslogar do nosso "gancho" de autenticação
  const { user, logout } = useAuth();
  
  // Pegamos as notificações e as funções para gerenciá-las (ler, marcar todas como lidas)
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  
  // Estado para saber se a janelinha de notificações está aberta ou fechada
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Referência para detectar cliques fora da janelinha e fechá-la automaticamente
  const dropdownRef = useRef(null);

  // Esse efeito "escuta" cliques no documento todo para fechar o menu se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Função simples para escolher o ícone certo baseado no tipo do alerta (sucesso, aviso, erro)
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <Check className="text-green-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={16} />;
      default: return <Info className="text-blue-500" size={16} />;
    }
  };

  // Formata a hora da notificação para aparecer bonitinho (ex: 14:30)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-[100]">
      {/* Lado Esquerdo: Logo do Sistema */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0 border border-gray-100 shadow-sm p-1">
          <img src="/SGHSS.png" alt="SGHSS Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-base sm:text-lg font-black text-primary tracking-tighter">SGHSS</h1>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden xs:inline">Gestão Hospitalar</span>
        </div>
      </div>
      
      {/* Lado Direito: Notificações e Perfil */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Bloco de Notificações */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2.5 rounded-full relative transition-colors ${isNotificationsOpen ? 'bg-gray-100 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Notificações"
          >
            <Bell size={20} className="sm:size-22" />
            {/* Bolinha vermelha com o número de mensagens não lidas */}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[9px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Janelinha (Dropdown) de Notificações */}
          {isNotificationsOpen && (
            <div className="absolute right-[-10px] sm:right-0 mt-2 w-[calc(100vw-1rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[1000] animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-sm sm:text-base text-gray-900">Notificações</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] sm:text-xs text-primary hover:underline font-bold"
                  >
                    Ler todas
                  </button>
                )}
              </div>
              
              {/* Lista de alertas com rolagem */}
              <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell size={32} className="mx-auto mb-2 opacity-10" />
                    <p className="text-xs sm:text-sm font-medium">Nenhuma notificação por aqui</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (window.innerWidth < 640) setIsNotificationsOpen(false);
                      }}
                      className={`p-4 border-b border-gray-50 last:border-0 cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 ${!notification.isRead ? 'bg-primary/5' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        notification.type === 'success' ? 'bg-green-100' : 
                        notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className={`text-xs sm:text-sm font-bold truncate ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notification.title}
                          </p>
                          <span className="text-[9px] sm:text-[10px] text-gray-400 whitespace-nowrap ml-2">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                <button className="text-[10px] sm:text-xs text-primary font-bold hover:underline transition-colors">
                  Ver todo o histórico
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Linha vertical para separar os ícones */}
        <div className="h-6 w-px bg-gray-200 mx-1"></div>
        
        {/* Bloco do Usuário (Nome e Foto) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex flex-col items-end mr-1 leading-tight">
            <span className="text-xs font-black text-primary tracking-tight">Olá, {user?.name?.split(' ')[0]}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user?.role}</span>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/5 shadow-sm">
            <User size={18} />
          </div>
          {/* Botão de Sair rápido */}
          <button 
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-500 transition-all hover:scale-110 active:scale-90"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
