import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, Search, ArrowRight } from 'lucide-react';
import { users } from '../../data/mockData';

// Este componente é o modal usado pelo médico para agendar uma consulta para um paciente manualmente
const NewAppointmentModal = ({ 
  isOpen,       // Diz se o modal está aberto
  onClose,      // Função para fechar o modal
  selectedDate, // Data que o médico clicou na agenda
  selectedTime, // Horário que o médico clicou na agenda
  onConfirm     // Função disparada ao escolher o paciente e confirmar
}) => {
  const [search, setSearch] = useState(''); // Estado da busca por paciente
  
  if (!isOpen) return null;

  // Filtra apenas os usuários que são pacientes
  const patients = users.filter(u => u.role === 'paciente');
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Formata a data para um texto amigável (ex: 12 de abril)
  const dateLabel = selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo com desfoque */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20 animate-in zoom-in duration-300">
        {/* Cabeçalho do Modal */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
          <div>
            <h3 className="text-2xl font-bold">Nova Consulta</h3>
            <p className="text-white/70 text-sm">Selecione o paciente para confirmar</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Resumo do Horário Selecionado */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
              <CalendarIcon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Horário Escolhido</p>
              <p className="font-bold text-primary">
                {dateLabel} às {selectedTime || '08:00'}
              </p>
            </div>
          </div>

          {/* Busca de Paciente */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              autoFocus
              type="text"
              placeholder="Nome do paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Lista de Resultados dos Pacientes */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => onConfirm(patient)}
                  className="w-full p-4 rounded-2xl border border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-primary transition-colors font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-primary text-sm">{patient.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: #{patient.id}000</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={16} />
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">Nenhum paciente encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Rodapé informativo */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            O paciente receberá uma notificação automática após o agendamento
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
