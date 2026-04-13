import React from 'react';

// O componente de Paginação ajuda a dividir uma lista grande em várias páginas menores
const Pagination = ({ 
  currentPage,    // Página que está sendo exibida agora
  totalPages,     // Total de páginas no sistema
  onPageChange,   // Função que muda a página ao clicar nos botões
  totalItems,     // Total de itens na lista original
  itemsPerPage,   // Quantos itens cabem em cada página
  indexOfFirstItem, // Posição do primeiro item da página atual
  indexOfLastItem   // Posição do último item da página atual
}) => {
  // Se só tiver uma página, não precisa mostrar os botões de navegação
  if (totalPages <= 1) return null;

  return (
    <div className="p-6 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
      {/* Texto informativo sobre os itens sendo mostrados agora */}
      <p className="text-sm text-gray-500">
        Mostrando <span className="font-bold text-primary">{indexOfFirstItem + 1}</span> a <span className="font-bold text-primary">{Math.min(indexOfLastItem, totalItems)}</span> de <span className="font-bold text-primary">{totalItems}</span> pacientes
      </p>
      
      {/* Botões de navegação entre as páginas */}
      <div className="flex gap-2">
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1} // Desativa se já estiver na primeira página
          className={`px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold transition-all shadow-sm ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-primary hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        <button 
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages} // Desativa se já estiver na última página
          className={`px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold transition-all shadow-sm ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-primary hover:bg-gray-50'
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Pagination;
