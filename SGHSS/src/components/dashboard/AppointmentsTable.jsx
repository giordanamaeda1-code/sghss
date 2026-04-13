import React from 'react';
import { ArrowRight } from 'lucide-react';

// Este componente exibe uma tabela com os agendamentos (consultas) recentes
const AppointmentsTable = ({ 
  isDoctor,   // Se for médico, mostra o nome do paciente. Se for paciente, mostra o médico.
  data = [],  // A lista de consultas que vem do banco de dados (ou mockData)
  onViewMore  // Função para ir para a página completa de agendamentos
}) => {
  // Define os textos de acordo com quem está logado
  const title = isDoctor ? 'Próximas Consultas' : 'Minhas Consultas';
  const actionLabel = isDoctor ? 'Ver todos os pacientes' : 'Ver meu histórico';
  
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <header className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-lg text-primary">{title}</h3>
        {/* Botão para ver mais detalhes */}
        <button 
          onClick={onViewMore}
          className="text-sm font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all"
        >
          {actionLabel} <ArrowRight size={14} />
        </button>
      </header>

      {/* Área de rolagem horizontal para telas pequenas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            {/* Cabeçalho da tabela */}
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {isDoctor ? 'Paciente' : 'Médico'}
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {isDoctor ? 'Tipo' : 'Especialidade'}
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Data e Hora</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Mapeia os dados para criar as linhas da tabela (mostra no máximo 4) */}
            {data.slice(0, 4).map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-primary">
                  {isDoctor ? apt.patientName : apt.doctorName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {isDoctor ? 'Retorno' : apt.specialty}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">{apt.date}</span>
                    <span className="text-xs text-gray-400">{apt.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* Etiqueta colorida baseada no status da consulta */}
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    apt.status === 'Confirmado' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))}
            {/* Mensagem caso não existam consultas */}
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                  Não há agendamentos para exibir.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
