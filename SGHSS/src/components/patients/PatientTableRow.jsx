import React from 'react';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Configurações de estilo para cada status do paciente (Ativo, Em tratamento)
const STATUS_CONFIG = {
  'Ativo': {
    badge: 'bg-green-50 text-green-600 border border-green-100', // Verde para ativo
    dot: 'bg-green-500'
  },
  'Em tratamento': {
    badge: 'bg-blue-50 text-blue-600 border border-blue-100', // Azul para em tratamento
    dot: 'bg-blue-500'
  }
};

// Este componente desenha uma única linha (row) na tabela de pacientes
const PatientTableRow = ({ 
  patient,             // Dados do paciente (nome, datas, status)
  isMenuOpen,          // Se o menu de "Ações" deste paciente está aberto
  onMenuToggle,        // Função para abrir/fechar o menu de ações
  onFinalizeTreatment  // Função disparada ao clicar em "Finalizar Tratamento"
}) => {
  const navigate = useNavigate();
  // Busca o estilo visual correto baseado no status do paciente
  const statusStyle = STATUS_CONFIG[patient.status] || STATUS_CONFIG['Ativo'];

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      {/* Coluna 1: Foto (inicial) e Nome do Paciente */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-lg">
            {patient.patientName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-primary group-hover:text-primary-dark">{patient.patientName}</p>
            <p className="text-xs text-gray-500">ID: #{patient.patientId}00{patient.id}</p>
          </div>
        </div>
      </td>
      
      {/* Coluna 2: Data da última visita */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-gray-400" />
          <span className="text-sm font-medium">{patient.lastVisit}</span>
        </div>
      </td>
      
      {/* Coluna 3: Data da próxima consulta agendada */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm font-medium">{patient.nextAppointment}</span>
        </div>
      </td>
      
      {/* Coluna 4: Etiqueta de status com bolinha colorida */}
      <td className="px-6 py-5">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${statusStyle.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
          {patient.status}
        </span>
      </td>
      
      {/* Coluna 5: Botões de ação (Prontuário, Agenda, Mensagem, Mais) */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          {/* Link para abrir o PDF do prontuário */}
          <a 
            href="/Prontuario SGHSS.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" 
            title="Ver Prontuário"
          >
            <FileText size={18} />
          </a>
          {/* Botão para levar para a página de agendamento */}
          <button 
            onClick={() => navigate('/schedule', { state: { openNewApp: true, patientName: patient.patientName } })}
            className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" 
            title="Nova Consulta"
          >
            <Calendar size={18} />
          </button>
          {/* Botão para enviar mensagem no chat */}
          <button 
            onClick={() => navigate('/inbox')}
            className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all" 
            title="Enviar Mensagem"
          >
            <MessageSquare size={18} />
          </button>
          
          <div className="w-px h-6 bg-gray-100 mx-1"></div>
          
          {/* Menu de ações extras (dropdown) */}
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMenuToggle(patient.id);
              }}
              className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
            >
              <MoreHorizontal size={18} />
            </button>

            {/* Balão flutuante com a opção de Finalizar Tratamento */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 py-2 animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => onFinalizeTreatment(patient.patientName)}
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-primary hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="text-green-500" />
                  Finalizar Tratamento
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default PatientTableRow;
