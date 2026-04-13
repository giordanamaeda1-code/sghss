import React, { useState, useEffect } from 'react';
import { 
  Inbox as InboxIcon, 
  Search, 
  Trash2, 
  Star, 
  Clock, 
  AlertCircle,
  ChevronRight,
  MoreVertical,
  Mail,
  Send,
  ArrowLeft,
  User,
  ShieldCheck
} from 'lucide-react';
import { messages as initialMessages } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

const Inbox = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages.filter(m => m.targetRole === user?.role));
  const [selectedMessage, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos'); // todos, unread, system, doctor

  // Recarrega as mensagens se o usuário mudar ou para garantir o filtro correto no início
  useEffect(() => {
    setMessages(initialMessages.filter(m => m.targetRole === user?.role));
  }, [user]);

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         msg.sender.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && !msg.isRead;
    if (filter === 'system') return matchesSearch && msg.type === 'system';
    if (filter === 'doctor') return matchesSearch && msg.type === 'doctor';
    return matchesSearch;
  });

  const handleToggleRead = (id) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const handleSelectMessage = (msg) => {
    setSelectedDate(msg);
    handleToggleRead(msg.id);
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <InboxIcon className="text-primary" />
            Minhas Mensagens
          </h1>
          <p className="text-gray-500 mt-1">
            Você tem <span className="font-bold text-primary">{stats.unread}</span> mensagens não lidas.
          </p>
        </div>
        
        <div className="relative max-w-md w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar mensagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Área Principal da Caixa de Entrada */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Barra Lateral / Filtros */}
        <div className="w-full md:w-64 border-r border-gray-50 p-4 md:p-6 space-y-2 bg-gray-50/30 overflow-x-auto custom-scrollbar">
          <div className="flex md:flex-col gap-2 min-w-max md:min-w-0">
            {[
              { id: 'todos', label: 'Todas', icon: <Mail size={18} /> },
              { id: 'unread', label: 'Não lidas', icon: <AlertCircle size={18} /> },
              { id: 'doctor', label: 'Médicos', icon: <User size={18} /> },
              { id: 'system', label: 'Sistema', icon: <ShieldCheck size={18} /> },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => {setFilter(f.id); setSelectedDate(null);}}
                className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                  filter === f.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-500 hover:bg-white hover:text-primary'
                }`}
              >
                {f.icon}
                {f.label}
                {f.id === 'unread' && stats.unread > 0 && (
                  <span className={`ml-auto px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] ${filter === 'unread' ? 'bg-white text-primary' : 'bg-red-500 text-white'}`}>
                    {stats.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Conteúdo */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Visualização de Lista */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar ${selectedMessage ? 'hidden lg:block border-r border-gray-50' : 'block'}`}>
            {filteredMessages.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 md:p-6 cursor-pointer transition-all hover:bg-gray-50/50 relative group ${
                      !msg.isRead ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent'
                    } ${selectedMessage?.id === msg.id ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${msg.isRead ? 'bg-transparent' : 'bg-primary'}`}></div>
                        <span className={`text-xs md:text-sm font-bold ${!msg.isRead ? 'text-primary' : 'text-gray-600'}`}>
                          {msg.sender}
                        </span>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(msg.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <h4 className={`text-xs md:text-sm mb-1 truncate ${!msg.isRead ? 'font-bold text-primary' : 'text-gray-700'}`}>
                      {msg.subject}
                    </h4>
                    <p className="text-[11px] md:text-xs text-gray-500 line-clamp-1">
                      {msg.preview}
                    </p>
                    
                    <div className="absolute right-2 md:right-4 bottom-2 md:bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl shadow-sm text-gray-400 hover:text-red-500 border border-gray-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 opacity-20">
                <Mail size={48} className="mb-4" />
                <p className="font-bold text-sm md:text-base">Nenhuma mensagem</p>
              </div>
            )}
          </div>

          {/* Visualização de Detalhes */}
          <div className={`flex-[1.5] flex flex-col bg-white ${selectedMessage ? 'absolute inset-0 z-10 lg:relative' : 'hidden lg:flex items-center justify-center opacity-30 p-10 text-center'}`}>
            {selectedMessage ? (
              <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                {/* Cabeçalho dos Detalhes */}
                <div className="p-4 md:p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <button 
                      onClick={() => setSelectedDate(null)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-400 flex-shrink-0"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl">
                      {selectedMessage.sender.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-primary text-base md:text-xl truncate">{selectedMessage.subject}</h3>
                      <p className="text-[10px] md:text-sm text-gray-500 flex items-center gap-1 md:gap-2 truncate">
                        De: <span className="font-bold text-primary truncate">{selectedMessage.sender}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-2 flex-shrink-0">
                    <button className="p-2 md:p-3 hover:bg-gray-50 rounded-xl md:rounded-2xl text-gray-400 hover:text-red-500 transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Conteúdo dos Detalhes */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="bg-gray-50/50 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-lg whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>
                </div>

                {/* Rodapé dos Detalhes / Resposta Rápida */}
                <div className="p-4 md:p-8 border-t border-gray-50 bg-gray-50/30">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        placeholder="Resposta rápida..."
                        className="w-full pl-4 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 bg-white border border-gray-200 rounded-xl md:rounded-[1.5rem] focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm text-sm"
                      />
                      <button className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 md:p-2.5 bg-primary text-white rounded-lg md:rounded-xl hover:bg-primary-dark transition-all">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <InboxIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">Selecione uma mensagem</h3>
                <p className="max-w-xs text-xs md:text-sm text-gray-500">Escolha um item da lista ao lado para ler o conteúdo completo.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Inbox;
