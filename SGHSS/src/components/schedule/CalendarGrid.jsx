import React from 'react';

// Este componente desenha os números do calendário (a grade de dias)
const CalendarGrid = ({ 
  days,                   // Lista com os dias do mês atual (1, 2, 3...)
  paddingDays,            // Dias vazios no início para alinhar com o dia da semana correto
  currentMonth,           // O mês que está sendo exibido
  selectedDate,           // A data que o usuário clicou
  onSelectDate,           // Função disparada ao clicar em um dia
  isSameDay,              // Função que compara se duas datas são iguais
  highlightAppointments = [], // Lista de datas que têm consultas (para colocar uma marcação)
  variant = 'default'     // Estilo visual (pode ser 'default' ou 'compact')
}) => {
  const isCompact = variant === 'compact';

  return (
    <div className="animate-in fade-in duration-300">
      {/* Título dos dias da semana (D, S, T, Q, Q, S, S) */}
      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <span key={`${d}-${i}`} className={`font-bold text-gray-300 uppercase ${isCompact ? 'text-[10px]' : 'text-[9px]'}`}>
            {d}
          </span>
        ))}
      </div>
      
      {/* Grade com os botões de cada dia */}
      <div className={`grid grid-cols-7 ${isCompact ? 'gap-2' : 'gap-1'}`}>
        {/* Espaços vazios para o calendário começar no dia da semana certo */}
        {paddingDays.map(d => <div key={`pad-${d}`} />)}
        
        {/* Mapeia cada dia do mês para criar um botão clicável */}
        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isSelected = isSameDay(date, selectedDate);
          
          const dateStr = date.toISOString().split('T')[0];
          const hasApp = highlightAppointments.includes(dateStr);
          
          return (
            <button 
              key={day}
              type="button"
              onClick={() => onSelectDate(date)}
              // O estilo muda se o dia estiver selecionado ou se tiver consulta agendada
              className={`
                aspect-square flex items-center justify-center font-bold rounded-xl transition-all relative
                ${isCompact ? 'text-xs' : 'text-xs'}
                ${isSelected 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110 z-10' 
                  : hasApp && isCompact
                    ? 'bg-accent/40 text-primary hover:bg-accent/60' 
                    : 'text-primary hover:bg-gray-50'
                }
                ${!isCompact && isSelected ? 'bg-primary text-white shadow-lg' : ''}
                ${!isCompact && !isSelected ? 'hover:bg-white text-gray-600' : ''}
              `}
            >
              {day}
              {/* Mostra uma bolinha laranja (accent) se houver consulta nesse dia */}
              {hasApp && isCompact && !isSelected && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full border border-white"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
