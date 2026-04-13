import React, { forwardRef } from 'react';
import { User, VideoOff } from 'lucide-react';

// Este componente é o "palco" onde os vídeos aparecem (o vídeo da outra pessoa e o seu próprio)
const VideoArea = forwardRef(({ 
  isCameraOn,      // Se a sua câmera está ligada
  blurBackground,  // Se o efeito de desfoque de fundo está ativo
  waitingText,     // Texto que aparece enquanto a outra pessoa não entra
  children         // Os botões de controle que serão desenhados por cima do vídeo
}, ref) => {
  return (
    <div 
      ref={ref}
      className="lg:col-span-3 bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-2xl border-2 md:border-4 border-white shadow-primary/5 min-h-[350px] md:min-h-[500px]"
    >
      {/* Vídeo Remoto (O que você vê da outra pessoa - aqui simulado com um ícone de espera) */}
      <div className="text-white text-center z-10 px-6 -translate-y-12 md:-translate-y-12">
        <div className="w-16 h-16 md:w-28 md:h-28 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-white/10 shadow-inner">
          <User size={32} className="text-white/20 md:w-16 md:h-16" />
        </div>
        <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{waitingText}</h3>
        <p className="text-white/40 text-[10px] md:text-sm max-w-xs mx-auto leading-relaxed">
          Sua conexão está estável. A chamada começará em instantes.
        </p>
      </div>

      {/* Gradiente decorativo por cima do fundo escuro */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/10 pointer-events-none"></div>

      {/* Câmera Local (Picture-in-Picture - aquele quadradinho no canto com a sua imagem) */}
      <div className={`
        absolute top-3 right-3 md:top-8 md:right-8 w-24 sm:w-32 md:w-64 aspect-video bg-gray-800 rounded-xl md:rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 z-20
        ${!isCameraOn ? 'flex items-center justify-center' : ''}
      `}>
        {isCameraOn ? (
          // Simulação da imagem da sua câmera
          <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 relative ${blurBackground ? 'blur-sm brightness-75' : ''}`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <User size={24} className="text-white md:w-12 md:h-12" />
            </div>
            <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 px-1.5 py-0.5 md:py-1 bg-black/40 backdrop-blur-md rounded-md text-[7px] md:text-[10px] text-white font-bold uppercase tracking-wider">
              Você
            </div>
          </div>
        ) : (
          // O que aparece se você desligar a sua câmera
          <div className="text-white/30 flex flex-col items-center gap-1">
            <VideoOff size={16} className="md:w-8 md:h-8" />
            <span className="text-[7px] md:text-[10px] font-bold uppercase">OFF</span>
          </div>
        )}
      </div>

      {/* Desenha os botões de controle (CallControls) que foram passados como "filhos" */}
      {children}
    </div>
  );
});

VideoArea.displayName = 'VideoArea';

export default VideoArea;
