import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

// Este componente mostra os campos básicos de perfil, como nome, e-mail e telefone
const TabGeneral = ({ user }) => {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg md:text-xl font-bold text-primary border-b border-gray-100 pb-4 flex items-center gap-2">
        <User size={20} className="text-primary" />
        Informações Pessoais
      </h3>
      
      {/* Grade de formulário com duas colunas no computador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Campo de Nome */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              defaultValue={user?.name} // Puxa o nome atual do usuário como valor inicial
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Campo de E-mail */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Campo de Telefone */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Telefone</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              name="phone"
              placeholder="(11) 99999-9999"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Campo de Data de Nascimento */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Data de Nascimento</label>
          <input
            type="date"
            name="birthDate"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TabGeneral;
