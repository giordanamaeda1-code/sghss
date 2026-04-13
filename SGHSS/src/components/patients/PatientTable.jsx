import React from 'react';
import { Search } from 'lucide-react';
import PatientTableRow from './PatientTableRow'; // Importa o componente que desenha cada linha da tabela

// Este componente organiza a tabela de pacientes completa
const PatientTable = ({ 
  patients,   // A lista de pacientes filtrada
  openMenuId, // ID do paciente que está com o menu de ações aberto
  handlers    // Funções para lidar com cliques e ações (ex: finalizar tratamento)
}) => {
  // Caso a busca ou filtro não retorne nenhum paciente, mostra uma mensagem amigável
  if (patients.length === 0) {
    return (
      <div className="p-20 text-center">
        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search size={40} />
        </div>
        <h3 className="text-xl font-bold text-primary">Nenhum paciente encontrado</h3>
        <p className="text-gray-500 mt-2 max-w-xs mx-auto">Não encontramos nenhum paciente correspondente à sua busca ou filtro.</p>
        {/* Botão para limpar a busca e voltar ao estado original */}
        <button 
          onClick={() => {
            handlers.onSearch('');
            handlers.onFilter('todos');
          }}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Limpar todos os filtros
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          {/* Títulos das colunas da tabela */}
          <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <th className="px-6 py-4">Paciente</th>
            <th className="px-6 py-4">Última Visita</th>
            <th className="px-6 py-4">Próxima Consulta</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {/* Para cada paciente na lista, cria uma nova linha na tabela */}
          {patients.map((patient) => (
            <PatientTableRow 
              key={patient.id} 
              patient={patient} 
              isMenuOpen={openMenuId === patient.id}
              onMenuToggle={handlers.onMenuToggle}
              onFinalizeTreatment={handlers.onFinalizeTreatment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
