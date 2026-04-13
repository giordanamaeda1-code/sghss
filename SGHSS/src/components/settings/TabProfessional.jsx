import React from 'react';
import { Stethoscope, Briefcase, CreditCard, Clock } from 'lucide-react';

// Este componente é exibido apenas se o usuário for um MÉDICO, para configurar CRM, especialidade e horários
const TabProfessional = ({ user }) => {
  // Lista dos dias da semana que o médico pode atender
  const weekDays = [
    { name: 'Segunda', active: true },
    { name: 'Terça', active: true },
    { name: 'Quarta', active: true },
    { name: 'Quinta', active: true },
    { name: 'Sexta', active: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4 flex items-center gap-2">
        <Stethoscope size={22} className="text-primary" />
        Informações Profissionais
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo para a Especialidade (ex: Cardiologista) */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Especialidade Principal</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="specialty"
              defaultValue={user?.specialty}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Campo para o registro profissional CRM */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Registro Profissional (CRM)</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="crm"
              placeholder="CRM-UF 000000"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Campo de Bio para o médico se descrever para os pacientes */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Biografia / Descrição</label>
          <textarea
            name="bio"
            rows="4"
            placeholder="Conte um pouco sobre sua experiência profissional..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Seção para marcar os dias da semana de atendimento */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-bold text-primary flex items-center gap-2">
            <Clock size={18} />
            Horários de Atendimento
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weekDays.map(day => (
              <div key={day.name} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <input 
                  type="checkbox" 
                  className="rounded text-primary focus:ring-primary/20" 
                  defaultChecked={day.active} 
                />
                <span className="text-sm font-medium text-gray-700">{day.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProfessional;
