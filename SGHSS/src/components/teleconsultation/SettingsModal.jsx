import React, { useState } from 'react';
import { 
  Settings, 
  X, 
  Video, 
  Volume2, 
  Sparkles, 
  Shield 
} from 'lucide-react';

// Este componente é uma janela de configurações rápida que aparece por cima do vídeo
const SettingsModal = ({ 
  isOpen,             // Se o modal está aberto
  onClose,            // Função para fechar
  blurBackground,     // Se o fundo está desfocado
  setBlurBackground   // Função para mudar o desfoque
}) => {
  const [activeTab, setActiveTab] = useState('video'); // Estado para controlar qual aba de configuração mostrar
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  if (!isOpen) return null;

  // Fecha ao clicar no fundo escuro (backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Lista de abas internas do modal
  const tabs = [
    { id: 'video', label: 'Vídeo', icon: <Video size={16} /> },
    { id: 'audio', label: 'Áudio', icon: <Volume2 size={16} /> },
    { id: 'fundo', label: 'Fundo', icon: <Sparkles size={16} /> },
    { id: 'geral', label: 'Geral', icon: <Shield size={16} /> },
  ];

  return (
    <div 
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Settings size={20} />
            </div>
            <h3 className="font-bold text-primary">Configurações da Chamada</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex">
          {/* Menu Lateral de Abas (interno do modal) */}
          <div className="w-28 md:w-32 border-r border-gray-100 p-2 flex flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all text-[10px] font-bold uppercase tracking-wider ${
                  activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Conteúdo que muda conforme a aba selecionada */}
          <div className="flex-1 p-6 h-[300px] overflow-y-auto custom-scrollbar">
            
            {/* ABA DE VÍDEO: Seleção de câmera */}
            {activeTab === 'video' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-sm font-bold text-gray-700">Câmera</p>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                  <option>FaceTime HD Camera (Built-in)</option>
                  <option>Logitech StreamCam</option>
                  <option>Virtual Camera</option>
                </select>
                <div className="p-4 bg-gray-900 rounded-xl aspect-video flex items-center justify-center text-white/20">
                  <Video size={32} />
                </div>
              </div>
            )}
            
            {/* ABA DE ÁUDIO: Seleção de mic e alto-falante */}
            {activeTab === 'audio' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-700">Microfone</p>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                    <option>Microfone Padrão</option>
                    <option>Yeti Stereo Microphone</option>
                  </select>
                  {/* Barra visual de volume simulada */}
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[60%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* ABA DE FUNDO: Controle de desfoque (Blur) */}
            {activeTab === 'fundo' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-sm font-bold text-gray-700">Efeitos Visuais</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setBlurBackground(false)}
                    className={`p-3 border-2 rounded-xl text-center transition-all ${!blurBackground ? 'border-primary bg-primary/5' : 'border-gray-100'}`}
                  >
                    <span className="text-xs font-bold">Nenhum</span>
                  </button>
                  <button 
                    onClick={() => setBlurBackground(true)}
                    className={`p-3 border-2 rounded-xl text-center transition-all ${blurBackground ? 'border-primary bg-primary/5' : 'border-gray-100'}`}
                  >
                    <span className="text-xs font-bold">Desfocar</span>
                  </button>
                </div>
              </div>
            )}

            {/* ABA GERAL: Segurança e LGPD */}
            {activeTab === 'geral' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-sm font-bold text-gray-700">Segurança da Chamada</p>
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-2xl">
                  <p className="text-[11px] text-blue-600 font-medium">Esta chamada é protegida por criptografia de ponta a ponta conforme os protocolos LGPD.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Rodapé com botão de fechar */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
          >
            Confirmar e Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
