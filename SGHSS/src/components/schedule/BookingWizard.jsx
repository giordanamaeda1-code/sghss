import React from 'react';
import { 
  CheckCircle2, 
  User, 
  ClipboardList, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import CalendarGrid from './CalendarGrid';

// O BookingWizard é um "assistente" que guia o paciente pelo processo de marcar uma consulta
const BookingWizard = ({ 
  step,           // O passo atual (1 a 4)
  onNext,         // Função para avançar para o próximo passo
  onPrev,         // Função para voltar um passo
  onCancel,       // Função para cancelar e sair do assistente
  error,          // Mensagem de erro caso falte alguma seleção
  bookingData,    // Objeto com todas as informações que o usuário selecionou
  onUpdateData,   // Função para atualizar os dados da consulta (médico, data, etc)
  calendarProps,  // Propriedades do calendário (mês, troca de mês, etc)
  doctors,        // Lista de médicos disponíveis para a especialidade
  specialties     // Lista de especialidades médicas cadastradas
}) => {
  const { selectedSpecialty, selectedDoctor, selectedDate } = bookingData;

  // Definição visual dos passos no topo da tela (Stepper)
  const steps = [
    { id: 1, name: 'Especialidade', icon: <ClipboardList size={20} /> },
    { id: 2, name: 'Médico', icon: <User size={20} /> },
    { id: 3, name: 'Data e Hora', icon: <Calendar size={20} /> },
    { id: 4, name: 'Confirmar', icon: <CheckCircle2 size={20} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Botão de sair do modo de agendamento */}
      <button 
        onClick={onCancel}
        className="mb-6 flex items-center gap-2 text-primary font-bold hover:underline"
      >
        <ArrowLeft size={20} />
        Voltar para Minha Agenda
      </button>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary">Agendar Consulta</h1>
        <p className="text-gray-500 mt-2">Siga os passos abaixo para marcar seu atendimento.</p>
      </div>

      {/* Alerta visual de erro caso o usuário tente avançar sem escolher nada */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="font-bold text-sm">{error}</p>
        </div>
      )}

      {/* Indicador de progresso (Stepper) com ícones e animações */}
      <div className="flex items-center justify-between mb-12 relative px-4 sm:px-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-3 relative z-10">
            <div className={`
              w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2
              ${step >= s.id 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110' 
                : 'bg-white border-gray-100 text-gray-300'}
            `}>
              {/* Mostra check se o passo já passou, senão mostra o ícone do passo */}
              {step > s.id ? <CheckCircle2 size={24} /> : React.cloneElement(s.icon, { size: 22 })}
            </div>
            <span className={`text-[9px] sm:text-xs font-bold uppercase tracking-tight transition-colors duration-500 ${step >= s.id ? 'text-primary' : 'text-gray-300'}`}>
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Área onde o conteúdo muda conforme o "step" (passo) atual */}
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-primary/5 p-5 sm:p-8 min-h-[400px] flex flex-col border border-gray-100">
        <div className="flex-1">
          
          {/* PASSO 1: Escolher a especialidade médica */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-primary">Selecione uma Especialidade</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {specialties.map((spec) => (
                  <button 
                    key={spec} 
                    onClick={() => onUpdateData({ selectedSpecialty: spec })} 
                    className={`p-4 sm:p-5 text-left border-2 rounded-2xl transition-all font-bold flex justify-between items-center group ${
                      selectedSpecialty === spec ? 'border-accent bg-accent/5 text-accent' : 'border-gray-100 text-primary hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{spec}</span>
                    <ArrowRight size={18} className={`${selectedSpecialty === spec ? 'opacity-100 text-accent' : 'opacity-0 group-hover:opacity-100 transition-all text-accent'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASSO 2: Escolher o médico daquela especialidade */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-primary">Escolha seu Médico</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">{selectedSpecialty}</span>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <div 
                      key={doc.id} 
                      onClick={() => onUpdateData({ selectedDoctor: doc })} 
                      className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 rounded-2xl sm:rounded-[2rem] transition-all cursor-pointer group ${
                        selectedDoctor?.id === doc.id ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-accent'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary">
                        <User size={24} className="sm:size-32" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-primary group-hover:text-accent transition-colors text-sm sm:text-base truncate">{doc.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{doc.specialty}</p>
                      </div>
                      <div className="ml-auto">
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-accent" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-3xl">
                    <AlertCircle className="mx-auto text-gray-300 mb-2" size={32} />
                    <p className="text-gray-500 text-sm">Nenhum médico encontrado.</p>
                    <button onClick={onPrev} className="mt-4 text-primary font-bold hover:underline text-sm">Voltar</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PASSO 3: Escolher o dia no calendário e o horário */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-primary">Data e Hora</h3>
              <p className="text-xs sm:text-sm text-gray-500">Consulta com <span className="font-bold text-primary">{selectedDoctor?.name}</span></p>
              
              {/* Calendário compacto */}
              <div className="max-w-md mx-auto bg-gray-50 p-4 sm:p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-primary capitalize text-sm sm:text-base">{calendarProps.formatMonth(calendarProps.currentMonth)}</h4>
                  <div className="flex gap-1">
                    <button onClick={calendarProps.prevMonth} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronLeft size={16} /></button>
                    <button onClick={calendarProps.nextMonth} className="p-2 hover:bg-white rounded-lg transition-all"><ChevronRight size={16} /></button>
                  </div>
                </div>
                
                <CalendarGrid 
                  {...calendarProps}
                  variant="default"
                />
              </div>

              {/* Botões de horários pré-definidos */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto mt-6">
                {['09:00', '10:30', '14:00', '15:30', '17:00'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => {
                      onUpdateData({ selectedTime: t });
                      onNext();
                    }} 
                    className="py-2.5 sm:py-3 border-2 border-gray-100 rounded-xl font-bold text-primary hover:border-accent hover:bg-accent/10 transition-all text-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASSO 4: Mensagem final de sucesso */}
          {step === 4 && (
            <div className="text-center py-12 space-y-6 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/10">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold text-primary">Consulta Agendada!</h3>
              <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                Tudo pronto! Sua consulta com o <span className="text-primary font-bold">{selectedDoctor?.name}</span> foi agendada para o dia <span className="text-primary font-bold">{selectedDate.toLocaleDateString('pt-BR')} às {bookingData.selectedTime}</span>.
              </p>
              <div className="pt-4">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl text-xs font-bold border border-primary/10">
                   <AlertCircle size={14} />
                   Lembrete enviado para seu e-mail
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Botões de navegação no rodapé do assistente */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
          <button 
            onClick={onPrev}
            disabled={step === 1 || step === 4}
            className={`flex items-center gap-2 font-bold transition-all ${step === 1 || step === 4 ? 'text-gray-300' : 'text-primary hover:text-accent'}`}
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          
          {step < 3 && (
            <button 
              onClick={onNext}
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Continuar
              <ArrowRight size={20} />
            </button>
          )}

          {step === 4 && (
            <button 
              onClick={onCancel}
              className="px-10 py-4 bg-accent text-primary font-bold rounded-2xl hover:scale-105 transition-all shadow-lg shadow-accent/20"
            >
              Finalizar e Ver Agenda
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
