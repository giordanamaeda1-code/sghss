import React from 'react';
import { Bell } from 'lucide-react';

// Este componente permite ao usuário escolher como quer ser avisado pelo sistema (E-mail, SMS, etc.)
const TabNotifications = () => {
  // Lista de opções de notificação configuráveis
  const notificationOptions = [
    { 
      title: 'Notificações por E-mail', 
      desc: 'Receba atualizações importantes via e-mail.',
      defaultChecked: true 
    },
    { 
      title: 'Notificações por SMS', 
      desc: 'Receba atualizações importantes via SMS.',
      defaultChecked: false 
    },
    { 
      title: 'Lembretes de Teleconsulta', 
      desc: 'Receba lembretes importantes via teleconsulta.',
      defaultChecked: true 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-4 flex items-center gap-2">
        <Bell size={22} className="text-primary" />
        Preferências de Notificação
      </h3>
      <div className="space-y-6">
        {/* Mapeia as opções para criar interruptores (toggles) na tela */}
        {notificationOptions.map((option, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="font-bold text-primary">{option.title}</p>
              <p className="text-sm text-gray-500">{option.desc}</p>
            </div>
            {/* O "Toggle" estilizado com CSS personalizado */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={option.defaultChecked} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabNotifications;
