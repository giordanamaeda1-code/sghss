import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

// Importação dos componentes que formam a tela de consulta por vídeo
import CallHeader from '../components/teleconsultation/CallHeader';
import VideoArea from '../components/teleconsultation/VideoArea';
import CallControls from '../components/teleconsultation/CallControls';
import SettingsModal from '../components/teleconsultation/SettingsModal';
import ChatPanel from '../components/teleconsultation/ChatPanel';

// Esta é a página principal da Teleconsulta (Chamada de Vídeo)
const Teleconsultation = () => {
  const { user } = useAuth() || {};
  const videoContainerRef = useRef(null); // Referência para conseguir colocar o vídeo em tela cheia
  
  // --- Estados para controlar os dispositivos de mídia ---
  const [isMicOn, setIsMicOn] = useState(true); // Microfone ligado/desligado
  const [isCameraOn, setIsCameraOn] = useState(true); // Câmera ligada/desligada
  const [blurBackground, setBlurBackground] = useState(false); // Efeito de fundo embaçado
  
  // --- Estados para controlar o que aparece na tela (UI) ---
  const [showSettings, setShowSettings] = useState(false); // Modal de configuração aberto/fechado
  const [isFullscreen, setIsFullscreen] = useState(false); // Se a página está em tela cheia

  const isDoctor = user?.role === 'medico';

  // --- Lógica para detectar se o usuário saiu da tela cheia ---
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Função para ativar ou desativar o modo de tela cheia (Fullscreen)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const el = videoContainerRef.current;
      if (el?.requestFullscreen) el.requestFullscreen();
      else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };
  
  // Define textos automáticos dependendo de quem está logado
  const callPartner = isDoctor ? 'João da Silva (Paciente)' : 'Dr. Ricardo Sout (Cardiologia)';
  const waitingText = isDoctor ? 'Aguardando o paciente entrar na sala...' : 'Conectando com o médico...';
  const systemMessage = isDoctor 
    ? 'O paciente foi notificado e deve entrar em instantes.' 
    : 'Por favor, aguarde o médico entrar na chamada.';

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 animate-in fade-in duration-500 relative">
      
      {/* Cabeçalho da Chamada (Nome do parceiro e status Ao Vivo) */}
      <CallHeader 
        callPartner={callPartner}
        isSettingsOpen={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 min-h-0">
        
        {/* Área Principal onde o Vídeo da outra pessoa aparece */}
        <VideoArea 
          ref={videoContainerRef}
          isCameraOn={isCameraOn}
          blurBackground={blurBackground}
          waitingText={waitingText}
        >
          {/* Modal de Configurações (Aparece por cima do vídeo) */}
          <SettingsModal 
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            blurBackground={blurBackground}
            setBlurBackground={setBlurBackground}
          />

          {/* Botões de Microfone, Câmera e Sair (Aparecem no rodapé do vídeo) */}
          <CallControls 
            isMicOn={isMicOn}
            onToggleMic={() => setIsMicOn(!isMicOn)}
            isCameraOn={isCameraOn}
            onToggleCamera={() => setIsCameraOn(!isCameraOn)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onOpenSettings={() => setShowSettings(true)}
          />
        </VideoArea>

        {/* Painel Lateral com Chat e Dicas do Sistema */}
        <ChatPanel 
          isDoctor={isDoctor}
          systemMessage={systemMessage}
        />

      </div>
    </div>
  );
};

export default Teleconsultation;
