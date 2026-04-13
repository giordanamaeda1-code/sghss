import React from 'react';
import { Heart } from 'lucide-react';

// Este componente é exibido apenas para PACIENTES, para salvar dados médicos básicos e contatos de emergência
const TabHealth = () => {
  // Lista de tipos sanguíneos para o menu de seleção (dropdown)
  const bloodTypes = ['Não informado', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4 flex items-center gap-2">
        <Heart size={22} className="text-primary" />
        Informações de Saúde
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seleção do Tipo Sanguíneo */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Tipo Sanguíneo</label>
          <select 
            name="bloodType"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Campo de Alergias */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Alergias Conhecidas</label>
          <input
            type="text"
            name="allergies"
            placeholder="Ex: Penicilina, Amendoim..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>

        {/* Histórico de Condições Prévias */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Condições Médicas Preexistentes</label>
          <textarea
            name="conditions"
            rows="3"
            placeholder="Ex: Hipertensão, Diabetes..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Informações para caso de Emergência */}
        <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
          <h4 className="font-bold text-primary">Contato de Emergência</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome do Contato</label>
              <input
                type="text"
                name="emergencyContactName"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Telefone</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabHealth;
