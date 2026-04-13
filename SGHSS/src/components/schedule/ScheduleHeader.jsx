import React from 'react';
import { Plus } from 'lucide-react';

// Este componente é o topo da página de agenda, onde o médico escolhe entre ver o "Dia" ou a "Semana"
const ScheduleHeader = ({ 
  user,               // Dados do médico logado
  view,               // A visualização atual ('dia' ou 'semana')
  setView,            // Função para trocar a visualização
  onNewAppointment    // Função para abrir o formulário de nova consulta
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Título e boas-vindas ao médico */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Minha Agenda</h1>
        <p className="text-gray-500 mt-1">
          Bem-vindo, Dr. {user?.name}. Gerencie seus horários e pacientes.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Seletor de visualização (Tabs) entre Dia e Semana */}
        <div className="flex bg-white p-1 border border-gray-100 rounded-2xl shadow-sm">
          <button 
            onClick={() => setView('dia')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              view === 'dia' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Dia
          </button>
          <button 
            onClick={() => setView('semana')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              view === 'semana' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Semana
          </button>
        </div>

        {/* Botão principal para criar um novo agendamento manualmente */}
        <button 
          onClick={onNewAppointment}
          className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus size={20} />
          Nova Consulta
        </button>
      </div>
    </div>
  );
};

export default ScheduleHeader;
