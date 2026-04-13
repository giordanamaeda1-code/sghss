import React from 'react';
import { Search } from 'lucide-react';

// Este componente contém a barra de busca e os filtros de status dos pacientes
const PatientFilters = ({ 
  searchTerm,      // Texto que o usuário está buscando
  onSearchChange,  // Função disparada ao digitar no campo de busca
  filterStatus,    // O status (filtro) selecionado no momento
  onFilterChange   // Função disparada ao clicar num botão de status
}) => {
  // Opções de status que o usuário pode filtrar na lista
  const statusOptions = ['todos', 'ativo', 'em tratamento'];

  return (
    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/30">
      {/* Barra de busca com ícone de lupa */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Buscar por nome do paciente..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
        />
      </div>

      {/* Botões de alternância de status (Filter Chips) */}
      <div className="flex items-center gap-3">
        <div className="flex bg-white p-1 border border-gray-200 rounded-2xl shadow-sm">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              // Se o status for o selecionado, ele fica com a cor principal (primary)
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                filterStatus === status 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:bg-white hover:text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientFilters;
