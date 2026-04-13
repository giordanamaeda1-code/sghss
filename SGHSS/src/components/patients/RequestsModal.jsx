import React from 'react';
import { X, Search, UserPlus } from 'lucide-react';

// Este componente é um modal que lista pacientes que pediram para ser atendidos pelo médico
const RequestsModal = ({ 
  isOpen,                 // Diz se o modal está aberto ou fechado
  onClose,                // Função para fechar o modal
  searchRequest,          // Texto da busca por solicitações
  onSearchRequestChange,  // Função que atualiza a busca
  requests,               // Lista de solicitações encontradas
  onAddPatient            // Função que aceita o paciente na lista do médico
}) => {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo com desfoque (blur) */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Conteúdo do Modal */}
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20 animate-in zoom-in duration-300 z-10">
        {/* Cabeçalho do modal com fundo azul escuro (primary) */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
          <div>
            <h3 className="text-2xl font-bold">Solicitações Pendentes</h3>
            <p className="text-white/70 text-sm">Selecione pacientes para adicionar à sua lista</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Campo de busca interno do modal */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Buscar solicitações..."
              value={searchRequest}
              onChange={(e) => onSearchRequestChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Lista de cartões de solicitações com rolagem vertical */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-2xl border border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar simples com a inicial do nome */}
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-primary transition-colors font-bold">
                      {request.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.email}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Solicitado em: {request.date}</p>
                    </div>
                  </div>
                  {/* Botão de "Mais" para adicionar o paciente à lista oficial */}
                  <button
                    onClick={() => onAddPatient(request)}
                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                    title="Aceitar Paciente"
                  >
                    <UserPlus size={18} />
                  </button>
                </div>
              ))
            ) : (
              // Mensagem caso não existam solicitações pendentes
              <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">Nenhuma solicitação encontrada.</p>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé informativo */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Novos pacientes precisam de aprovação manual
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestsModal;
