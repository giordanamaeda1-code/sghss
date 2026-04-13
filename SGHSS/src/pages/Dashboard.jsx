import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  Clock,
  ClipboardList
} from 'lucide-react'; // Ícones bonitos para o painel
import { useNavigate } from 'react-router-dom'; // Para navegar entre as páginas

// Dados e Autenticação
import { appointments, users } from '../data/mockData';
import { useUserRole } from '../hooks/useAuth';

// Componentes menores que compõem o Dashboard
import StatCard from '../components/dashboard/StatCard';
import PatientModal from '../components/dashboard/PatientModal';
import AppointmentsTable from '../components/dashboard/AppointmentsTable';

const Dashboard = () => {
  const { isDoctor } = useUserRole(); // Verifica se quem logou é médico
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false); // Controla se o modal de paciente está aberto
  const [search, setSearch] = useState(''); // Guarda o que o médico digita na busca

  // Filtra a lista de pacientes conforme a busca do médico
  const patientList = users.filter(u => u.role === 'paciente' && 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Função para começar uma consulta por vídeo
  const startConsultation = (id) => {
    setShowModal(false);
    setSearch('');
    navigate('/teleconsultation', { state: { patientId: id } }); // Vai para a página de vídeo
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho da página: muda o texto se for médico ou paciente */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {isDoctor ? 'Área do Médico' : 'Meu Painel'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isDoctor 
              ? 'Acompanhe seus pacientes e agendamentos de hoje.' 
              : 'Olá! Veja o resumo das suas atividades e consultas.'}
          </p>
        </div>
        {/* Botão de ação principal: Médicos iniciam consulta, Pacientes agendam */}
        <button 
          onClick={() => isDoctor ? setShowModal(true) : navigate('/schedule', { state: { isBooking: true } })}
          className="px-6 py-3 bg-accent text-primary font-bold rounded-xl shadow-lg shadow-accent/20 hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
        >
          {isDoctor ? 'Iniciar Teleconsulta' : 'Marcar Consulta'}
          {isDoctor ? <Activity size={18} /> : <Calendar size={18} />}
        </button>
      </header>

      {/* Cartões de estatísticas (Números rápidos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label={isDoctor ? "Pacientes Ativos" : "Total de Consultas"} 
          value={isDoctor ? "128" : "24"} 
          icon={isDoctor ? Users : Activity} 
          theme="blue" 
        />
        <StatCard 
          label={isDoctor ? "Consultas Hoje" : "Próximas Visitas"} 
          value={isDoctor ? "8" : "2"} 
          icon={Calendar} 
          theme="accent" 
        />
        <StatCard 
          label={isDoctor ? "Pendentes" : "Laudos Novos"} 
          value={isDoctor ? "3" : "15"} 
          icon={isDoctor ? ClipboardList : Users} 
          theme="purple" 
        />
        <StatCard 
          label={isDoctor ? "Avaliação" : "Saúde"} 
          value={isDoctor ? "4.9/5" : "98%"} 
          icon={TrendingUp} 
          theme="green" 
        />
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tabela com os agendamentos recentes */}
        <AppointmentsTable 
          isDoctor={isDoctor}
          data={appointments}
          onViewMore={() => navigate(isDoctor ? '/patients' : '/schedule')}
        />

        {/* Barra lateral com alertas ou atividades recentes */}
        <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-primary mb-6">
            {isDoctor ? 'Alertas do Dia' : 'Atividades Recentes'}
          </h3>
          <div className="space-y-6">
            {(isDoctor ? [1, 2] : [1, 2, 3]).map((i) => (
              <div 
                key={i} 
                className={`flex gap-4 ${!isDoctor ? 'cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-xl transition-colors' : ''}`}
                onClick={() => !isDoctor && navigate('/records')}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-100 last:hidden"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    {isDoctor ? 'Nova mensagem de paciente' : 'Exames disponíveis'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {isDoctor 
                      ? 'Maria Souza enviou uma dúvida sobre o Lisinopril.' 
                      : 'Seus resultados de sangue (15/03) já estão no sistema.'}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block">há {i} horas</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Modal que abre quando o médico clica em "Iniciar Teleconsulta" */}
      <PatientModal 
        open={showModal}
        onClose={() => { setShowModal(false); setSearch(''); }}
        search={search}
        onSearch={setSearch}
        patients={patientList}
        onSelect={startConsultation}
      />
    </div>
  );
};

export default Dashboard;
