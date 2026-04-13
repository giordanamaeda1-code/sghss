import React from 'react';
import { X, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

// Este componente é o assistente (wizard) que guia o usuário para ligar a segurança de dois fatores (2FA)
const TwoFactorModal = ({ 
  isOpen,               // Se o modal está aberto
  onClose,              // Função para fechar o modal
  step,                 // O passo atual da configuração (1, 2 ou 3)
  isActivating,         // Estado de carregamento simulado
  onSimulateActivation, // Função que avança para o QR Code
  onConfirmCode         // Função que finaliza a ativação
}) => {
  if (!isOpen) return null;

  // Função para fechar o modal se o usuário clicar no fundo escuro
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-white/20 z-10 mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-gray-400 hover:text-primary transition-colors"
        >
          <X size={20} /> 
        </button>

        <div className="p-6 md:p-10">
          {/* PASSO 1: Explicação inicial */}
          {step === 1 && (
            <div className="text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">Ativar 2FA</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                Para sua segurança, enviaremos um código de verificação sempre que houver um novo acesso à sua conta.
              </p>
              <button
                onClick={onSimulateActivation}
                disabled={isActivating}
                className="w-full py-3.5 md:py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {isActivating ? 'Gerando QR Code...' : 'Continuar Configuração'}
                {!isActivating && <ArrowRight size={20} />}
              </button>
            </div>
          )}

          {/* PASSO 2: Escanear QR Code e Digitar código */}
          {step === 2 && (
            <div className="text-center space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary">Escaneie o QR Code</h3>
              <div className="w-36 h-36 md:w-48 md:h-48 bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl mx-auto flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src="/qr-code.png"
                  alt="QR Code para 2FA"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <p className="text-xs md:sm text-gray-500 font-medium">Digite o código de 6 dígitos gerado no seu app:</p>
                <div className="flex justify-center gap-2 md:gap-3">
                  {/* Simulação visual dos campos de código */}
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-8 h-10 md:w-10 md:h-12 border-2 border-gray-100 rounded-lg md:rounded-xl bg-gray-50 flex items-center justify-center text-base md:text-lg font-bold text-primary">
                      {i}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={onConfirmCode}
                disabled={isActivating}
                className="w-full py-3.5 md:py-4 bg-primary text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {isActivating ? 'Verificando...' : 'Confirmar e Ativar'}
                {!isActivating && <CheckCircle2 size={20} />}
              </button>
            </div>
          )}

          {/* PASSO 3: Sucesso final */}
          {step === 3 && (
            <div className="text-center space-y-4 md:space-y-6 py-4 md:py-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary">2FA Ativado!</h3>
                <p className="text-sm md:text-base text-gray-500 mt-2">Sua conta agora está protegida com autenticação em duas etapas.</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3.5 md:py-4 bg-green-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-green-700 transition-all"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
