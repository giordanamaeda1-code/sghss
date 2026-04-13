import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Video, MoreVertical, Trash2 } from 'lucide-react';

// Este componente desenha um cartão de consulta dentro de uma linha do tempo (Timeline)
const AppointmentCard = ({ 
  appointment,  // Dados da consulta (médico, hora, especialidade)
  isActive,     // Se o menu de opções deste cartão está aberto
  onMenuToggle, // Função para abrir/fechar o menu de opções
  onCancel      // Função para cancelar a consulta
}) => {
  return (
    <div className="group relative flex gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Lado Esquerdo: Mostra o horário da consulta */}
      <div className="w-16 pt-1">
        <span className="text-lg font-bold text-primary">{appointment.time}</span>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Horário</div>
      </div>

      {/* Lado Direito: O conteúdo do cartão e a linha da Timeline */}
      <div className="flex-1 pb-8">
        {/* Linha vertical cinza decorativa */}
        <div className="absolute left-[76px] top-4 bottom-0 w-0.5 bg-gray-100 group-last:hidden"></div>
        {/* Bolinha na linha do tempo */}
        <div className="absolute left-[72px] top-3 w-2.5 h-2.5 rounded-full bg-primary border-4 border-white shadow-sm"></div>

        {/* Cartão Branco com as informações do médico */}
        <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              {/* Foto ou Inicial do Médico */}
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/20">
                {appointment.doctorName?.charAt(0) || 'D'}
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">{appointment.doctorName}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <span className="text-sm font-bold text-accent uppercase tracking-wider">{appointment.specialty}</span>
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Clock size={14} />
                    60 min
                  </span>
                </div>
              </div>
            </div>

            {/* Ações: Botão de vídeo e menu de cancelamento */}
            <div className="flex items-center gap-3">
              <Link 
                to="/teleconsultation" 
                className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                <Video size={16} />
                Entrar na Chamada
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => onMenuToggle(appointment.id)}
                  className={`p-2.5 rounded-xl transition-all ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary hover:bg-gray-100'}`}
                >
                  <MoreVertical size={20} />
                </button>
                
                {/* Dropdown de opções que aparece ao clicar nos três pontinhos */}
                {isActive && (
                  <>
                    {/* Camada invisível para fechar o menu ao clicar fora */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => onMenuToggle(null)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                      <button 
                        onClick={() => onCancel(appointment)}
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={16} />
                        Cancelar Chamada
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
