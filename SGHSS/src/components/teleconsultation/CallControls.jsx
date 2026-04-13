import React from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Minimize2, 
  Maximize2, 
  MoreVertical 
} from 'lucide-react';

// Este componente é a barra flutuante com os botões de áudio, vídeo e desligar chamada
const CallControls = ({ 
  isMicOn,            // Se o microfone está ativo
  onToggleMic,        // Função para ligar/desligar microfone
  isCameraOn,         // Se a câmera está ativa
  onToggleCamera,     // Função para ligar/desligar câmera
  isFullscreen,       // Se o vídeo está em tela cheia
  onToggleFullscreen, // Função para alternar tela cheia
  onOpenSettings      // Função para abrir opções extras
}) => {
  return (
    // Barra de botões com transparência e desfoque (efeito Glassmorphism)
    <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-4 bg-black/40 backdrop-blur-3xl px-3 md:px-8 py-2.5 md:py-4 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl z-30 w-[92%] md:w-auto justify-center">
      
      {/* Botão do Microfone - fica vermelho se estiver mudo */}
      <button 
        onClick={onToggleMic}
        className={`p-2.5 md:p-3.5 rounded-lg md:rounded-2xl transition-all shrink-0 ${
          isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {isMicOn ? <Mic size={18} className="md:w-6 md:h-6" /> : <MicOff size={18} className="md:w-6 md:h-6" />}
      </button>

      {/* Botão da Câmera - fica vermelho se estiver desligada */}
      <button 
        onClick={onToggleCamera}
        className={`p-2.5 md:p-3.5 rounded-lg md:rounded-2xl transition-all shrink-0 ${
          isCameraOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {isCameraOn ? <Video size={18} className="md:w-6 md:h-6" /> : <VideoOff size={18} className="md:w-6 md:h-6" />}
      </button>
      
      {/* Linha vertical separadora */}
      <div className="w-px h-6 md:h-10 bg-white/10 mx-0.5 md:mx-2"></div>
      
      {/* Botão de Encerrar Chamada - o botão principal vermelho */}
      <button 
        className="p-3.5 md:p-4.5 bg-red-600 hover:bg-red-700 text-white rounded-xl md:rounded-3xl transition-all hover:scale-105 shadow-xl shadow-red-600/40"
        title="Encerrar Chamada"
      >
        <PhoneOff size={20} className="md:w-7 md:h-7" />
      </button>

      <div className="w-px h-6 md:h-10 bg-white/10 mx-0.5 md:mx-2"></div>

      {/* Botão de Tela Cheia */}
      <button 
        onClick={onToggleFullscreen}
        className="p-2.5 md:p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-lg md:rounded-2xl transition-all shrink-0"
      >
        {isFullscreen ? <Minimize2 size={16} className="md:w-5 md:h-5" /> : <Maximize2 size={16} className="md:w-5 md:h-5" />}
      </button>

      {/* Botão de Mais Opções */}
      <button 
        onClick={onOpenSettings}
        className="p-2.5 md:p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-lg md:rounded-2xl transition-all shrink-0"
      >
        <MoreVertical size={16} className="md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default CallControls;
