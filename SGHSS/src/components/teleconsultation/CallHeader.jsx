import React from 'react';
import { Video, Users, Settings } from 'lucide-react';

// Este componente é o topo da tela de teleconsulta, mostrando quem está na chamada e o status "Ao Vivo"
const CallHeader = ({ 
  callPartner,      // Nome da pessoa com quem você está falando (paciente ou médico)
  isSettingsOpen,   // Se o modal de configurações de áudio/vídeo está aberto
  onToggleSettings  // Função para abrir/fechar as configurações
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Informações da Sessão */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Video size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Teleconsulta em Tempo Real</h1>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
            <Users size={14} />
            Sessão com: <span className="text-primary font-bold">{callPartner}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Indicador de que a gravação/transmissão está ativa */}
        <div className="px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold animate-pulse flex items-center gap-2 border border-red-200">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          AO VIVO • 12:45
        </div>
        {/* Botão de engrenagem para abrir as configurações técnicas */}
        <button 
          onClick={onToggleSettings}
          className={`p-2.5 transition-all border shadow-sm rounded-xl ${
            isSettingsOpen 
              ? 'bg-primary text-white border-primary' 
              : 'text-gray-400 hover:text-primary hover:bg-white border-transparent bg-gray-50/50'
          }`}
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default CallHeader;
