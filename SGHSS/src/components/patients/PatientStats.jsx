import React from 'react';
import { Users, Calendar, UserPlus, TrendingUp } from 'lucide-react';

// Este componente mostra os cartões de resumo (estatísticas) na página de Pacientes
const PatientStats = ({ 
  totalPatients, // Quantidade total de pacientes cadastrados
  pendingCount   // Quantidade de solicitações pendentes de novos pacientes
}) => {
  // Lista de dados que serão transformados em cartões na tela
  const stats = [
    { label: 'Total de Pacientes', value: totalPatients, icon: <Users className="text-blue-500" />, trend: '+4% este mês' },
    { label: 'Consultas Hoje', value: '8', icon: <Calendar className="text-purple-500" />, trend: '2 pendentes' },
    { label: 'Novos Pacientes', value: '12', icon: <UserPlus className="text-green-500" />, trend: '+15% vs mês passado' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* O .map percorre a lista "stats" e cria um visualizador para cada item */}
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
          {/* Ícone decorativo lateral */}
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h4 className="text-2xl font-bold text-primary">{stat.value}</h4>
            {/* Indicador de tendência (se os números estão subindo ou descendo) */}
            <p className="text-xs font-bold text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              {stat.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientStats;
