import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { 
  getDaysInMonth, 
  getFirstDayOfMonth, 
  isSameDay, 
  formatMonthYear, 
  formatDateISO 
} from '../../utils/calendar';

// Este componente é a barra lateral da agenda, que contém um mini-calendário e um resumo do dia
const CalendarSidebar = ({ 
  selected,     // A data que está selecionada no momento
  onSelect,     // Função para mudar a data selecionada
  appointments  // Lista de todas as consultas para mostrar marcações no calendário
}) => {
  // Estado para controlar qual mês está sendo exibido no mini-calendário
  const [curr, setCurr] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));

  // Função para avançar ou voltar o mês no mini-calendário
  const move = (dir) => {
    setCurr(new Date(curr.getFullYear(), curr.getMonth() + dir, 1));
  };

  // Gera a lista de dias do mês e os espaços vazios iniciais
  const days = Array.from({ length: getDaysInMonth(curr) }, (_, i) => i + 1);
  const pad = Array.from({ length: getFirstDayOfMonth(curr) }, (_, i) => i);

  // Filtra as consultas apenas do dia que o usuário selecionou
  const dayApps = appointments.filter(a => a.date === formatDateISO(selected));
  
  // Prepara os números do resumo (Total, Confirmadas, Pendentes)
  const stats = [
    { label: 'Total Hoje', val: dayApps.length, cls: 'text-primary' },
    { label: 'Confirmadas', val: dayApps.filter(a => a.status === 'Confirmado').length, cls: 'text-green-500' },
    { label: 'Pendentes', val: dayApps.filter(a => a.status === 'Pendente').length, cls: 'text-orange-500' },
  ];

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Bloco do Mini-Calendário */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <header className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-primary capitalize">{formatMonthYear(curr)}</h3>
          <div className="flex gap-1">
            <button onClick={() => move(-1)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronLeft size={18} /></button>
            <button onClick={() => move(1)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={18} /></button>
          </div>
        </header>
        
        {/* Nomes dos dias da semana abreviados */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
            <span key={d} className="text-[10px] font-bold text-gray-300">{d}</span>
          ))}
        </div>
        
        {/* Grade de dias do mini-calendário */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {pad.map(i => <div key={`p-${i}`} />)}
          {days.map(d => {
            const date = new Date(curr.getFullYear(), curr.getMonth(), d);
            const hasApp = appointments.some(a => a.date === formatDateISO(date));
            const active = isSameDay(date, selected);

            return (
              <button 
                key={d}
                onClick={() => onSelect(date)}
                className={`aspect-square flex items-center justify-center text-sm font-bold rounded-xl relative transition-all
                  ${active ? 'bg-primary text-white scale-110 z-10 shadow-lg' : hasApp ? 'bg-accent/30 text-primary' : 'text-primary hover:bg-gray-50'}
                `}
              >
                {d}
                {/* Pontinho que indica que tem consulta naquele dia */}
                {hasApp && !active && <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-accent rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bloco de Resumo Estatístico do Dia Selecionado */}
      <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
        <h4 className="font-bold text-primary mb-4 flex items-center gap-2"><AlertCircle size={18} /> Resumo</h4>
        <div className="space-y-4">
          {stats.map((s, i) => (
            <div key={i} className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500">{s.label}</span>
              <span className={s.cls}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
