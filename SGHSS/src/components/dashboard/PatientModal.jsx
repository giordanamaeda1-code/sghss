import React from 'react';
import { Search, X, User as UserIcon, ArrowRight } from 'lucide-react';

// Este componente é uma janela flutuante (Modal) para o médico escolher qual paciente atender
const PatientModal = ({ 
  open,     // Booleano que diz se o modal deve aparecer ou não
  onClose,  // Função para fechar o modal
  search,   // O texto que está sendo digitado na busca
  onSearch, // Função que atualiza o texto da busca
  patients, // Lista de pacientes que aparecem no resultado
  onSelect  // Função que inicia a consulta ao clicar no paciente
}) => {
  // Se "open" for falso, o componente não desenha nada na tela
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo escurecido que fecha o modal se for clicado */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Caixa branca centralizada com o conteúdo */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20 animate-in zoom-in duration-300">
        <header className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary">Iniciar Consulta</h3>
            <p className="text-sm text-gray-500">Selecione o paciente para teleatendimento</p>
          </div>
          {/* Botão de fechar (X) */}
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-primary"
          >
            <X size={24} />
          </button>
        </header>

        <div className="p-6">
          {/* Campo de busca com ícone de lupa */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              autoFocus
              type="text"
              placeholder="Buscar paciente pelo nome..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Lista de pacientes com barra de rolagem se for muito grande */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {patients.length > 0 ? (
              patients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  className="w-full p-4 rounded-2xl border border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-primary transition-colors">
                      <UserIcon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-primary text-sm">{p.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Aguardando chamada</p>
                    </div>
                  </div>
                  {/* Ícone de seta que aparece ao passar o mouse */}
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              ))
            ) : (
              // Mensagem caso a busca não retorne ninguém
              <div className="text-center py-8">
                <p className="text-gray-400">Nenhum paciente encontrado com esse nome.</p>
              </div>
            )}
          </div>
        </div>

        <footer className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            A conexão de vídeo iniciará ao selecionar
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PatientModal;
