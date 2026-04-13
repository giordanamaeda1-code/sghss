import React from 'react';
import { Shield, Key } from 'lucide-react';

// Este componente gerencia a alteração de senha e o status da Autenticação de Dois Fatores (2FA)
const TabSecurity = ({ 
  is2FAEnabled, // Booleano que diz se o 2FA está ligado
  onToggle2FA   // Função para ativar ou desativar o 2FA
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg md:text-xl font-bold text-primary border-b border-gray-100 pb-4 flex items-center gap-2">
        <Shield size={22} className="text-primary" />
        Segurança da Conta
      </h3>
      
      {/* Seção de Alteração de Senha */}
      <div className="space-y-4 sm:space-y-6 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Senha Atual</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nova Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Seção do 2FA (Segurança Extra) */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-gray-50 rounded-3xl border border-gray-100 gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            {/* Ícone que muda de cor se o 2FA estiver ativo */}
            <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${
              is2FAEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
            }`}>
              <Key size={24} />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <p className="text-primary font-bold text-sm sm:text-base">
                  Autenticação em duas etapas (2FA)
                </p>
                {/* Etiqueta verde indicando que está Ativo */}
                {is2FAEnabled && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold rounded-full uppercase tracking-widest">
                    Ativo
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Camada extra de segurança para sua conta.
              </p>
            </div>
          </div>
          {/* Botão para configurar ou desligar a proteção extra */}
          <button
            type="button"
            onClick={onToggle2FA}
            className={`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl transition-all text-sm ${
              is2FAEnabled 
                ? 'text-red-500 bg-red-50/50 hover:bg-red-50' 
                : 'text-primary bg-white border border-gray-200 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {is2FAEnabled ? 'Desativar' : 'Configurar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabSecurity;
