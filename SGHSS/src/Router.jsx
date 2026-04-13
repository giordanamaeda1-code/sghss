import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
// Importação de todas as páginas do sistema
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Teleconsultation from './pages/Teleconsultation';
import Profile from './pages/Profile';
import Records from './pages/Records';
import Settings from './pages/Settings';
import Patients from './pages/Patients';
import DoctorSchedule from './pages/DoctorSchedule';
import Inbox from './pages/Inbox';

const Router = () => {
  return (
    // O BrowserRouter permite que a URL do navegador mude sem recarregar a página toda
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas: qualquer um pode acessar sem login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rotas Protegidas: só entra quem estiver logado */}
        <Route element={<ProtectedRoute />}>
          {/* MainLayout é o esqueleto da página (Sidebar, Header, etc.) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/teleconsultation" element={<Teleconsultation />} />
            
            {/* Rota Unificada que decide qual agenda mostrar */}
            <Route 
              path="/schedule" 
              element={
                <ScheduleDispatcher />
              } 
            />
            
            {/* Rotas que SÓ o paciente pode ver */}
            <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
              <Route path="/records" element={<Records />} />
            </Route>

            {/* Rotas que SÓ o médico pode ver */}
            <Route element={<ProtectedRoute allowedRoles={['medico']} />}>
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctor/schedule" element={<DoctorSchedule />} />
            </Route>
          </Route>
        </Route>

        {/* Se o usuário digitar um link que não existe, ele volta para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Esse "Dispatcher" ajuda a escolher a página de agenda correta (médico ou paciente)
const ScheduleDispatcher = () => {
  const { user } = useAuth(); // Pega as informações do usuário logado
  
  if (user?.role === 'medico') return <DoctorSchedule />; // Se for médico, mostra a agenda dele
  if (user?.role === 'paciente') return <Schedule />; // Se for paciente, mostra a agenda de consultas
  
  return <Navigate to="/" replace />; // Se não for nada, volta pra home
};

export default Router;
