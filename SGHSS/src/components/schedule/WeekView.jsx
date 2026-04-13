import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { getWeekDays, isSameDay, formatDateISO } from '../../utils/calendar';

// Este componente mostra a agenda completa de uma semana (7 dias lado a lado)
const WeekView = ({ 
  selectedDate,     // A data central da semana que está sendo mostrada
  appointments,     // Lista de todas as consultas agendadas
  onSelectDate,     // Função disparada ao clicar em um dia ou agendamento
  onNewAppointment  // Função para abrir o modal de nova consulta
}) => {
  // Pega os 7 objetos de Data correspondentes à semana atual
  const weekDays = getWeekDays(selectedDate);
  const today = new Date(); // Data de hoje para destacar no calendário

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      {/* Cabeçalho do Cartão da Semana */}
      <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
          <CalendarIcon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">Agenda da Semana</h3>
          <p className="text-sm text-gray-500 font-medium">
            De {weekDays[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} a {weekDays[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>

      {/* Grade da Semana: 7 Colunas */}
      <div className="p-6 overflow-x-auto pb-8 custom-scrollbar">
        <div className="grid grid-cols-7 gap-4 min-w-[800px]">
          {weekDays.map((date, idx) => {
            const dateStr = formatDateISO(date);
            // Filtra consultas específicas para este dia da coluna
            const dayApps = appointments.filter(app => app.date === dateStr);
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);

            return (
              <div 
                key={idx} 
                className={`flex flex-col rounded-[2rem] border transition-all pb-4 ${
                  isSelected ? 'border-primary/20 bg-primary/5 shadow-inner' : 'border-gray-100 bg-gray-50/20'
                }`}
              >
                {/* Cabeçalho do Dia (ex: SEG 12) */}
                <div className={`p-4 text-center border-b border-gray-100 transition-colors ${
                  isToday ? 'bg-primary text-white rounded-t-[2rem]' : ''
                }`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${
                    isToday ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </p>
                  <p className="text-lg font-bold">
                    {date.getDate()}
                  </p>
                </div>

                {/* Conteúdo do Dia: Lista de agendamentos curtinhos */}
                <div className="p-3 space-y-3">
                  <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar min-h-[100px]">
                    {dayApps.length > 0 ? (
                      dayApps.map(app => (
                        <div 
                          key={app.id} 
                          onClick={() => onSelectDate(date)}
                          className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-primary/30 transition-all cursor-pointer group"
                        >
                          <p className="text-[10px] font-bold text-primary truncate leading-tight group-hover:text-accent">
                            {app.patientName}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[9px] font-bold text-accent uppercase">{app.time}</span>
                            {app.status === 'Confirmado' && <CheckCircle2 size={10} className="text-green-500" />}
                          </div>
                        </div>
                      ))
                    ) : (
                      // Desenha um ícone apagado se o dia estiver vazio
                      <div className="py-8 flex flex-col items-center justify-center opacity-5">
                        <CalendarIcon size={20} />
                      </div>
                    )}
                  </div>

                  {/* Botão rápido para agendar nesse dia específico */}
                  <button 
                    onClick={() => {
                      onSelectDate(date);
                      onNewAppointment();
                    }}
                    className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-[10px] font-bold text-gray-400 hover:border-primary hover:text-primary transition-all bg-white/50 hover:bg-white active:scale-95"
                  >
                    + Agendar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
