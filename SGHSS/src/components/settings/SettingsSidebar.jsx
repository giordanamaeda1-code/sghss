import React from 'react';

// Este componente é o menu de abas (tabs) que fica na lateral da página de configurações
const SettingsSidebar = ({ 
  tabs,         // Lista de abas disponíveis (Geral, Segurança, etc.)
  activeTab,    // ID da aba que está selecionada no momento
  onTabChange   // Função para trocar de aba ao clicar
}) => {
  return (
    <div className="w-full md:w-64 shrink-0 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
      {/* Contêiner das abas que vira uma lista vertical no desktop e horizontal no celular */}
      <div className="bg-white rounded-[2rem] p-2 md:p-4 shadow-sm border border-gray-100 flex md:flex-col gap-2 min-w-max md:min-w-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              // O estilo do botão muda completamente se a aba estiver ativa
              className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all font-medium text-sm md:text-base ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;
