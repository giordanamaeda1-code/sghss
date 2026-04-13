import React, { useState } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

// Este componente é o chat de texto que fica ao lado do vídeo durante a consulta
const ChatPanel = ({ 
  isDoctor,       // Se quem está usando é médico (para mostrar dicas extras)
  systemMessage   // Mensagem automática do sistema (ex: "Aguardando conexão")
}) => {
  const [message, setMessage] = useState(''); // Estado para guardar o que está sendo digitado

  // Função para simular o envio da mensagem
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Simulação de envio (em um sistema real, enviaria para o servidor)
    console.log('Mensagem enviada:', message);
    setMessage('');
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 flex flex-col overflow-hidden shadow-sm shadow-primary/5 h-[400px] md:h-auto">
      {/* Cabeçalho do Chat */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-2">
        <MessageSquare size={18} className="text-primary" />
        <h3 className="font-bold text-primary text-sm">Chat da Consulta</h3>
      </div>

      {/* Área das Mensagens (onde as bolhas de texto aparecem) */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
        {/* Exemplo de Mensagem do Sistema */}
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-3xl rounded-tl-none mr-6">
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">Sistema</p>
          <p className="text-sm text-gray-600 leading-relaxed">{systemMessage}</p>
        </div>
        
        {/* Exemplo de Mensagem enviada pelo próprio usuário */}
        <div className="bg-primary p-4 rounded-3xl rounded-tr-none ml-6 shadow-lg shadow-primary/10">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1 text-right">Você</p>
          <p className="text-sm text-white leading-relaxed text-right">Olá, já estou pronto para iniciar a consulta.</p>
        </div>

        {/* Aviso que só o médico vê */}
        {isDoctor && (
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl text-xs text-primary font-medium">
            <span className="block font-bold mb-1 italic">Dica:</span>
            Você pode visualizar o prontuário do paciente na aba de registros durante a chamada.
          </div>
        )}
      </div>

      {/* Campo de Digitação no rodapé do chat */}
      <div className="p-6 bg-gray-50/50 border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="relative group">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="w-full pl-5 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-sm transition-all shadow-sm"
          />
          {/* Botão de Enviar (Seta) */}
          <button 
            type="submit"
            disabled={!message.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-primary/20"
          >
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
