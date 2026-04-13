import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

// Este componente é um modal de confirmação para quando o médico precisa cancelar um horário
const CancelAppointmentModal = ({ 
  isOpen,       // Diz se o modal está visível
  onClose,      // Função para fechar o modal sem fazer nada
  appointment,  // Dados da consulta que será cancelada
  onConfirm     // Função disparada ao confirmar o cancelamento com um motivo
}) => {
  const [reason, setReason] = useState(''); // Estado para guardar o texto do motivo digitado

  // Se o modal não estiver aberto ou não tiver consulta selecionada, não mostra nada
  if (!isOpen || !appointment) return null;

  // Função interna para validar se o médico digitou um motivo antes de confirmar
  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Fundo escuro atrás do modal */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Caixa do Modal */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100 animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-primary transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <div className="text-center space-y-6">
            {/* Ícone de aviso vermelho */}
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={40} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">Cancelar Consulta</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Você está prestes a cancelar o horário de <strong>{appointment.patientName}</strong>. 
                Isso liberará a agenda para outros pacientes.
              </p>
            </div>
            
            {/* Campo para o médico escrever o porquê do cancelamento */}
            <div className="text-left space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Motivo do Cancelamento</label>
              <textarea 
                autoFocus
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Indisponibilidade médica, reagendamento necessário..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none h-32 text-sm"
              />
            </div>

            {/* Botões de decisão final */}
            <div className="flex gap-4 pt-2">
              <button 
                onClick={onClose}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              >
                Voltar
              </button>
              <button 
                onClick={handleConfirm}
                disabled={!reason.trim()} // Botão fica desativado se não tiver texto no motivo
                className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
