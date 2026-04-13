import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Search, 
  X, 
  Clock, 
  CheckCircle2, 
  Video, 
  MoreVertical 
} from 'lucide-react';
import { formatFullDate, formatDateISO } from '../../utils/calendar';

// Este componente mostra a agenda detalhada de um único dia (Timeline de 08:00 às 17:00)
const DayView = ({ 
  date,           // A data que está sendo visualizada
  appointments,   // Lista de todas as consultas do médico
  onNew,          // Função para abrir o modal de novo agendamento
  onCancel,       // Função para abrir o modal de cancelamento
  onStart         // Função para iniciar a teleconsulta (vídeo)
}) => {
  const [search, setSearch] = useState('');     // Texto da busca por paciente no dia
  const [isSearch, setIsSearch] = useState(false); // Se a barra de busca está visível
  const [menuId, setMenuId] = useState(null);   // ID da consulta que está com o menu aberto

  // Lista de horários padrão que aparecem na agenda (slots)
  const slots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  // Filtra as consultas apenas do dia selecionado
  const dayApps = appointments.filter(a => a.date === formatDateISO(date));
  
  // Se estiver buscando, mostra apenas os pacientes filtrados, senão mostra todos os horários vazios
  const filtered = search 
    ? dayApps.filter(a => a.patientName.toLowerCase().includes(search.toLowerCase()))
    : slots;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
      {/* Cabeçalho da Agenda Diária */}
      <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">Agenda do Dia</h3>
            <p className="text-sm text-gray-500 font-medium">{formatFullDate(date)}</p>
          </div>
        </div>

        {/* Ferramenta de Busca */}
        <div className="flex items-center gap-2">
          {isSearch ? (
            <div className="relative animate-in slide-in-from-right-4">
              <input 
                autoFocus
                type="text"
                placeholder="Paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none w-48 md:w-64"
              />
              <button onClick={() => { setIsSearch(false); setSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSearch(true)} className="p-2.5 text-gray-400 hover:bg-white rounded-xl border border-transparent hover:border-gray-100">
              <Search size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Lista de Horários da Timeline */}
      <div className="p-6 space-y-4">
        {filtered.map(item => {
          // Verifica se naquele horário existe uma consulta marcada
          const app = typeof item === 'object' ? item : dayApps.find(a => a.time === item);
          const time = typeof item === 'object' ? item.time : item;

          return (
            <div key={time} className="flex gap-6 group" onClick={() => setMenuId(null)}>
              {/* Horário na esquerda */}
              <span className="w-14 pt-4 text-sm font-bold text-gray-300 shrink-0">{time}</span>
              
              <div className="flex-1 relative pb-4">
                {/* Linha vertical decorativa da timeline */}
                <div className="absolute left-[-25px] top-0 bottom-0 w-0.5 bg-gray-100 group-last:bg-transparent" />
                <div className="absolute left-[-28px] top-5 w-2 h-2 rounded-full bg-gray-200 border-2 border-white" />

                {/* Se existir agendamento, mostra o cartão do paciente */}
                {app ? (
                  <div className={`p-5 rounded-3xl border flex items-center justify-between ${
                    app.status === 'Confirmado' ? 'bg-green-50/50 border-green-100' : 'bg-orange-50/50 border-orange-100'
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Avatar do Paciente */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                        app.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {app.patientName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          {app.patientName} {app.status === 'Confirmado' && <CheckCircle2 size={16} className="text-green-500" />}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{app.specialty} • 60 min</p>
                      </div>
                    </div>

                    {/* Botões de Ação para o Agendamento */}
                    <div className="flex items-center gap-2">
                      <button onClick={onStart} className="hidden sm:flex px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl items-center gap-2">
                        <Video size={14} /> Iniciar
                      </button>
                      
                      <div className="relative">
                        <button onClick={(e) => { e.stopPropagation(); setMenuId(menuId === app.id ? null : app.id); }} className="p-2 text-gray-400">
                          <MoreVertical size={18} />
                        </button>
                        {menuId === app.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 py-2">
                            <button onClick={() => onCancel(app)} className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
                              <X size={16} /> Cancelar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Se o horário estiver vazio, mostra um espaço "Disponível"
                  <div className="p-5 rounded-3xl border border-dashed border-gray-100 bg-gray-50/30 flex items-center justify-between group/empty">
                    <span className="text-sm font-bold text-gray-300">Disponível</span>
                    {/* Botão de agendar que só aparece ao passar o mouse (hover) */}
                    <button onClick={() => onNew(time)} className="opacity-0 group-hover/empty:opacity-100 px-4 py-2 bg-white text-primary text-xs font-bold rounded-xl border border-gray-200">
                      Agendar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
