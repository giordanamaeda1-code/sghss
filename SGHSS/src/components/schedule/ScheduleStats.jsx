import React from 'react';
import { AlertCircle } from 'lucide-react';

// O ScheduleStats é um pequeno resumo que aparece na lateral para mostrar os números da agenda
const ScheduleStats = ({ 
  total, // Quantidade total de consultas agendadas no sistema
  today  // Quantidade de consultas marcadas para o dia de hoje
}) => {
  // Lista de itens que serão mostrados no resumo
  const stats = [
    { label: 'Total Agendado', value: total, color: 'text-primary' },
    { label: 'Hoje', value: today, color: 'text-accent' },
  ];

  return (
    <div className="bg-accent/10 p-6 rounded-[2.5rem] border border-accent/20">
      {/* Título do resumo com ícone de alerta */}
      <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
        <AlertCircle size={18} className="text-primary" />
        Resumo
      </h4>
      <div className="space-y-4">
        {/* Percorre a lista de estatísticas e desenha cada uma delas */}
        {stats.map((s, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">{s.label}</span>
            <span className={`font-bold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleStats;
