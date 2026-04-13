import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Stethoscope,
  ChevronRight,
  Filter
} from 'lucide-react';

// Esta página mostra o histórico médico do paciente (Prontuários)
const Records = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Texto para buscar médicos ou diagnósticos
  const [typeFilter, setTypeFilter] = useState('Todos'); // Filtro para tipo de consulta (Vídeo ou Presencial)
  
  // Lista fictícia de prontuários para simular um banco de dados
  const records = [
    {
      id: 1,
      date: '15/03/2026',
      doctor: 'Ricardo Sout',
      specialty: 'Cardiologia',
      diagnosis: 'Check-up de rotina - Hipertensão controlada',
      status: 'Finalizado',
      type: 'Consulta Presencial'
    },
    {
      id: 2,
      date: '28/02/2026',
      doctor: 'Dra. Marina Costa',
      specialty: 'Dermatologia',
      diagnosis: 'Tratamento de dermatite tópica',
      status: 'Finalizado',
      type: 'Teleconsulta'
    },
    {
      id: 3,
      date: '10/01/2026',
      doctor: 'Dr. Tiago Ramos',
      specialty: 'Ortopedia',
      diagnosis: 'Recuperação de lesão no tornozelo - Fisioterapia indicada',
      status: 'Finalizado',
      type: 'Consulta Presencial'
    },
    {
      id: 4,
      date: '05/12/2025',
      doctor: 'Dra. Ana Paula Lima',
      specialty: 'Ginecologia',
      diagnosis: 'Exames anuais preventivos',
      status: 'Finalizado',
      type: 'Consulta Presencial'
    },
    {
      id: 5,
      date: '20/11/2025',
      doctor: 'Dr. Marcos Vinícius',
      specialty: 'Neurologia',
      diagnosis: 'Avaliação de enxaquecas frequentes',
      status: 'Finalizado',
      type: 'Teleconsulta'
    }
  ];

  // Pega todos os tipos de consulta únicos para montar o menu de filtro
  const types = ['Todos', ...new Set(records.map(r => r.type))];

  // Lógica que filtra a lista baseada no que o usuário digitou e no tipo selecionado
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'Todos' || record.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Abre o arquivo PDF de exemplo em uma nova aba
  const handleView = () => {
    window.open('/Prontuario SGHSS.pdf', '_blank');
  };

  // Faz o download automático do arquivo PDF
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Prontuario SGHSS.pdf';
    link.download = 'Prontuario_SGHSS.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Cabeçalho com Título e Ferramentas de Busca */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Meus Prontuários</h1>
          <p className="text-slate-500">Histórico completo de suas consultas e diagnósticos.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Barra de Busca */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por médico ou especialidade..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filtro de Tipo de Consulta */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none cursor-pointer text-slate-600 font-medium"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Cartões de Resumo (Estatísticas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total de Prontuários</p>
            <p className="text-xl font-bold text-slate-800">{records.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Última Consulta</p>
            <p className="text-xl font-bold text-slate-800">
              {records.length > 0 ? records[0].date : 'Nenhuma'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
            <Stethoscope size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Especialidades</p>
            <p className="text-xl font-bold text-slate-800">4 Atendidas</p>
          </div>
        </div>
      </div>

      {/* Tabela Principal de Prontuários */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Data</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Médico</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Especialidade</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Diagnóstico Resumido</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Gera as linhas da tabela a partir da lista filtrada */}
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="font-medium">{record.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                          <User size={16} />
                        </div>
                        <span className="font-semibold text-slate-800">{record.doctor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                        {record.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-sm text-slate-500 truncate max-w-xs">{record.diagnosis}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Botões para ver ou baixar o prontuário em PDF */}
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={handleView}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={handleDownload}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Baixar PDF"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Mensagem caso nada seja encontrado
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    Nenhum prontuário encontrado para a sua busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informativo de Segurança (LGPD) */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
          <FileText size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-800 text-sm">Privacidade e Segurança</h4>
          <p className="text-xs text-blue-700 mt-1 leading-relaxed">
            Seus prontuários são documentos sigilosos e protegidos pela LGPD. Apenas você e os médicos autorizados têm acesso a estas informações. Em caso de dúvidas sobre diagnósticos anteriores, entre em contato com o suporte médico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Records;
