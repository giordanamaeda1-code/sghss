import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

// Este componente é o modal de cancelamento para o PACIENTE (parecido com o do médico, mas com textos para o paciente)
const CancelModal = ({ 
  isOpen,       // Diz se o modal deve ser mostrado
  appointment,  // A consulta que o paciente quer cancelar
  onClose,      // Função para fechar o modal
  onConfirm     // Função para confirmar o cancelamento
}) => {
  const [justification, setJustification] = useState(''); // Guarda o texto da justificativa

  if (!isOpen) return null;

  // Limpa o texto e confirma o cancelamento
  const handleConfirm = () => {
    onConfirm(appointment, justification);
    setJustification('');
  };

  // Limpa o texto e fecha sem cancelar
  const handleClose = () => {
    setJustification('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100 z-10">
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-primary transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-primary">Cancelar Consulta</h3>
            <p className="text-gray-500 leading-relaxed">
              Você está prestes a cancelar sua consulta com o <span className="font-bold text-primary">{appointment?.doctorName}</span>.
            </p>
            
            {/* Campo de texto para o paciente justificar o cancelamento */}
            <div className="text-left space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Justificativa do Cancelamento</label>
              <textarea 
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Por favor, nos conte o motivo do cancelamento..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-32 text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleClose}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              >
                Voltar
              </button>
              <button 
                onClick={handleConfirm}
                disabled={!justification.trim()}
                className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CancelModal;
