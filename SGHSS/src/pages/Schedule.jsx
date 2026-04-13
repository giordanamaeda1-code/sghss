import React, { useState, useEffect, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useLocation } from "react-router-dom";

// Hooks e Dados
import { useAuth } from '../hooks/useAuth';
import { useCalendar } from '../hooks/useCalendar';
import { appointments, users } from '../data/mockData';

// Componentes
import CalendarGrid from '../components/schedule/CalendarGrid';
import AppointmentCard from '../components/schedule/AppointmentCard';
import BookingWizard from '../components/schedule/BookingWizard';
import CancelModal from '../components/schedule/CancelModal';
import ScheduleStats from '../components/schedule/ScheduleStats';

const SPECIALTIES = ['Cardiologia', 'Dermatologia', 'Neurologia', 'Pediatria', 'Ortopedia', 'Clínico Geral'];

const Schedule = () => {
  const { user } = useAuth();
  const location = useLocation();
  const calendar = useCalendar();
  
  // Estado da Interface (UI)
  const [isBooking, setIsBooking] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  
  // Estado do Assistente de Agendamento (Wizard)
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    selectedSpecialty: '',
    selectedDoctor: null,
    selectedDate: new Date(),
    selectedTime: ''
  });

  useEffect(() => {
    if (location.state?.isBooking) setIsBooking(true);
  }, [location.state]);

  // Dados Derivados
  const doctors = useMemo(() => users?.filter(u => u.role === 'medico') || [], []);
  
  const filteredDoctors = useMemo(() => {
    return bookingData.selectedSpecialty 
      ? doctors.filter(d => d.specialty === bookingData.selectedSpecialty)
      : doctors;
  }, [doctors, bookingData.selectedSpecialty]);

  const patientAppointments = useMemo(() => {
    const dateStr = calendar.selectedDate.toISOString().split('T')[0];
    return (appointments || []).filter(app => 
      app && app.patientId === user?.id && app.date === dateStr
    );
  }, [calendar.selectedDate, user?.id]);

  const allPatientAppointments = useMemo(() => {
    return (appointments || []).filter(a => a && a.patientId === user?.id);
  }, [user?.id]);

  const highlightDates = useMemo(() => {
    return allPatientAppointments.map(a => a.date);
  }, [allPatientAppointments]);

  // Manipuladores de Eventos (Handlers)
  const handleUpdateBooking = (updates) => {
    setBookingData(prev => ({ ...prev, ...updates }));
    setError('');
    // Avanço automático para seleções simples
    if (updates.selectedSpecialty || updates.selectedDoctor) handleNextStep();
  };

  const handleNextStep = () => {
    if (step === 1 && !bookingData.selectedSpecialty) return setError('Selecione uma especialidade.');
    if (step === 2 && !bookingData.selectedDoctor) return setError('Escolha um médico.');
    setError('');
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleCancelBooking = () => {
    setIsBooking(false);
    setStep(1);
    setError('');
    setBookingData({ selectedSpecialty: '', selectedDoctor: null, selectedDate: new Date(), selectedTime: '' });
  };

  const handleConfirmCancel = (app, justification) => {
    console.log(`Cancelando ${app.id}: ${justification}`);
    setShowCancelModal(false);
    setAppointmentToCancel(null);
  };

  if (isBooking) {
    return (
      <BookingWizard 
        step={step}
        error={error}
        bookingData={bookingData}
        onNext={handleNextStep}
        onPrev={() => setStep(prev => Math.max(prev - 1, 1))}
        onCancel={handleCancelBooking}
        onUpdateData={handleUpdateBooking}
        calendarProps={calendar}
        doctors={filteredDoctors}
        specialties={SPECIALTIES}
      />
    );
  }

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Minhas Consultas</h1>
          <p className="text-gray-500 mt-1">Olá, {user?.name}. Visualize e gerencie seus agendamentos.</p>
        </div>

        <button 
          onClick={() => setIsBooking(true)}
          className="px-8 py-4 bg-primary text-white font-bold rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:bg-primary/90 transition-all group active:scale-95"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          Agendar Nova Consulta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Barra Lateral */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-primary capitalize">{calendar.formatMonth(calendar.currentMonth)}</h3>
              <div className="flex gap-2">
                <button onClick={calendar.prevMonth} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><ChevronLeft size={18} /></button>
                <button onClick={calendar.nextMonth} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><ChevronRight size={18} /></button>
              </div>
            </div>
            
            <CalendarGrid 
              {...calendar}
              variant="compact"
              onSelectDate={calendar.setSelectedDate}
              highlightAppointments={highlightDates}
            />
          </div>

          <ScheduleStats total={allPatientAppointments.length} today={patientAppointments.length} />
        </aside>

        {/* Visualização Principal */}
        <main className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
            <header className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-gray-100">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Agenda do Dia</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {calendar.selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            </header>

            <div className="p-8">
              {patientAppointments.length > 0 ? (
                <div className="space-y-6">
                  {patientAppointments.map((app) => (
                    <AppointmentCard 
                      key={app.id}
                      appointment={app}
                      isActive={activeMenuId === app.id}
                      onMenuToggle={setActiveMenuId}
                      onCancel={(a) => {
                        setAppointmentToCancel(a);
                        setShowCancelModal(true);
                        setActiveMenuId(null);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <CalendarIcon size={40} className="text-gray-200" />
                  </div>
                  <h4 className="text-xl font-bold text-primary">Nenhuma consulta agendada</h4>
                  <p className="text-gray-500 mt-2 max-w-xs mx-auto">Você não possui compromissos médicos marcados para este dia.</p>
                  <button 
                    onClick={() => setIsBooking(true)}
                    className="mt-8 px-8 py-3 bg-accent/20 text-primary font-bold rounded-xl hover:bg-accent/30 transition-all border border-accent/20"
                  >
                    Agendar para esta data
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <CancelModal 
        isOpen={showCancelModal}
        appointment={appointmentToCancel}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default Schedule;
