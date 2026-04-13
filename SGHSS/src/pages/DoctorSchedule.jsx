import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Ganchos e Dados (Hooks & Data)
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { appointments } from '../data/mockData';

// Componentes (Components)
import ScheduleHeader from '../components/schedule/ScheduleHeader';
import CalendarSidebar from '../components/schedule/CalendarSidebar';
import DayView from '../components/schedule/DayView';
import WeekView from '../components/schedule/WeekView';
import NewAppointmentModal from '../components/schedule/NewAppointmentModal';
import CancelAppointmentModal from '../components/schedule/CancelAppointmentModal';

const DoctorSchedule = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [view, setView] = useState('dia'); 
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('08:00');

  const [showNewModal, setShowNewModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    if (state?.openNewApp) setShowNewModal(true);
  }, [state]);

  const openNewModal = (selectedTime) => {
    if (selectedTime) setTime(selectedTime);
    setShowNewModal(true);
  };

  const confirmNewApp = (patient) => {
    showToast(`Consulta de ${patient.name} agendada!`, 'success');
    setShowNewModal(false);
  };

  const confirmCancel = (reason) => {
    showToast(`Agendamento cancelado. Motivo: ${reason.slice(0, 20)}...`, 'success');
    setCancelTarget(null);
  };

  if (!user) return <div className="p-20 text-center text-gray-400 animate-pulse font-bold">Carregando agenda...</div>;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      <ScheduleHeader 
        user={user} 
        view={view} 
        setView={setView} 
        onNew={() => openNewModal()} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CalendarSidebar 
          selected={date} 
          onSelect={setDate} 
          appointments={appointments} 
        />

        <div className="lg:col-span-3">
          {view === 'dia' ? (
            <DayView 
              date={date}
              appointments={appointments}
              onNew={openNewModal}
              onCancel={setCancelTarget}
              onStart={() => navigate('/teleconsultation')}
            />
          ) : (
            <WeekView 
              date={date}
              appointments={appointments}
              onSelect={setDate}
              onNew={() => openNewModal()}
            />
          )}
        </div>
      </div>

      <NewAppointmentModal 
        open={showNewModal}
        onClose={() => setShowNewModal(false)}
        date={date}
        time={time}
        onConfirm={confirmNewApp}
      />

      <CancelAppointmentModal 
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        appointment={cancelTarget}
        onConfirm={confirmCancel}
      />
    </div>
  );
};

export default DoctorSchedule;
