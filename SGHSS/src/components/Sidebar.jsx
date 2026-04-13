import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Componente para links que sabem quando estão "ativos"
import { 
  LayoutDashboard, 
  Calendar, 
  Video, 
  FileText, 
  Settings, 
  Menu, 
  X,
  PlusCircle,
  UserCircle,
  Users,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'; // Ícones para o menu
import { useAuth, useUserRole } from '../hooks/useAuth';

// A Sidebar é o menu lateral que ajuda o usuário a navegar entre as páginas do sistema
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Estado para abrir/fechar o menu lateral
  const { logout } = useAuth(); // Função para deslogar
  const { isPatient, isDoctor } = useUserRole(); // Verifica se o usuário logado é médico ou paciente para mostrar os links certos

  // Links que só o paciente vê
  const patientLinks = [
    { name: 'Painel', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Agendamento', icon: <Calendar size={20} />, path: '/schedule' },
    { name: 'Teleconsulta', icon: <Video size={20} />, path: '/teleconsultation' },
    { name: 'Meus Prontuários', icon: <FileText size={20} />, path: '/records' },
  ];

  // Links que só o médico vê
  const doctorLinks = [
    { name: 'Painel Médico', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Pacientes', icon: <Users size={20} />, path: '/patients' },
    { name: 'Agenda', icon: <Calendar size={20} />, path: '/schedule' },
    { name: 'Consultas Online', icon: <Video size={20} />, path: '/teleconsultation' },
  ];

  // Links que aparecem para todo mundo
  const commonLinks = [
    { name: 'Mensagens', icon: <Mail size={20} />, path: '/inbox' },
    { name: 'Perfil', icon: <UserCircle size={20} />, path: '/profile' },
    { name: 'Configurações', icon: <Settings size={20} />, path: '/settings' },
  ];

  // Monta a lista final de links baseado no papel do usuário
  const navItems = isPatient ? patientLinks : isDoctor ? doctorLinks : [];
  const allItems = [...navItems, ...commonLinks];

  // Função para abrir/fechar o menu
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão flutuante para abrir o menu no celular */}
      <button 
        className="fixed bottom-4 right-4 z-50 p-3 bg-primary text-white rounded-full lg:hidden shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* A Barra Lateral em si */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white text-primary transition-all duration-300 z-40 border-r border-gray-100 shadow-sm
        ${isOpen ? 'w-64' : 'w-20'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Topo do menu com o botão de recolher (hambúrguer) */}
          <div className={`h-20 flex items-center border-b border-gray-100 overflow-hidden ${isOpen ? 'px-6 justify-start' : 'justify-center'}`}>
            <button 
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-primary shrink-0"
              title={isOpen ? "Recolher menu" : "Expandir menu"}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Lista de links de navegação */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {allItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                  ${isActive ? 'bg-accent/20 text-primary font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}
                  ${!isOpen && 'justify-center'}
                `}
                title={!isOpen ? item.name : ''}
              >
                <span className={`shrink-0 ${isOpen ? '' : 'scale-110'}`}>{item.icon}</span>
                {isOpen && <span className="text-sm">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Botão de Sair no rodapé do menu */}
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={logout}
              className={`w-full py-3 flex items-center gap-3 transition-all rounded-xl font-bold
                ${isOpen ? 'bg-red-50 hover:bg-red-100 text-red-600 px-4 justify-start' : 'text-red-400 hover:text-red-600 justify-center'}
              `}
              title={!isOpen ? "Sair" : ""}
            >
              <LogOut size={20} className="shrink-0" />
              {isOpen && <span className="text-sm">Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Camada escura que aparece atrás do menu no celular */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
