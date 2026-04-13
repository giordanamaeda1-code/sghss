import { useState, useMemo } from 'react';
import { medicalRecords, appointments } from '../data/mockData';
import { useNotifications } from '../hooks/useNotifications';

const PATIENTS_PER_PAGE = 5;

export const usePatients = () => {
  const { showToast } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [searchRequest, setSearchRequest] = useState('');

  // Simulação de solicitações de novos pacientes
  const [pendingRequests, setPendingRequests] = useState([
    { id: 201, name: "Lucas Oliveira", email: "lucas@email.com", date: "2026-03-23" },
    { id: 202, name: "Fernanda Lima", email: "fernanda@email.com", date: "2026-03-24" },
    { id: 203, name: "Roberto Santos", email: "roberto@email.com", date: "2026-03-24" },
    { id: 204, name: "Juliana Paes", email: "juliana@email.com", date: "2026-03-25" },
  ]);

  // Enriquecer dados dos pacientes
  const patientsData = useMemo(() => {
    const baseData = [
      ...medicalRecords.map(record => {
        const patientAppointments = appointments.filter(app => app.patientId === record.patientId);
        const nextAppointment = patientAppointments
          .filter(app => new Date(app.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

        return {
          ...record,
          nextAppointment: nextAppointment ? `${nextAppointment.date} às ${nextAppointment.time}` : 'Não agendado',
          status: record.patientId % 2 === 0 ? 'Em tratamento' : 'Ativo'
        };
      }),
      { id: 50, patientId: 10, patientName: "Marcos Vinícius", lastVisit: "2026-03-15", nextAppointment: "2026-04-02 às 09:00", status: "Ativo" },
      { id: 51, patientId: 11, patientName: "Clara Mendes", lastVisit: "2026-03-18", nextAppointment: "2026-03-29 às 14:00", status: "Em tratamento" },
      { id: 52, patientId: 12, patientName: "Henrique Souza", lastVisit: "2026-03-20", nextAppointment: "Não agendado", status: "Ativo" },
    ];
    return baseData;
  }, []);

  const filteredPatients = useMemo(() => {
    return patientsData.filter(patient => 
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'todos' || patient.status.toLowerCase() === filterStatus.toLowerCase())
    );
  }, [patientsData, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE);
  
  const currentPatients = useMemo(() => {
    const indexOfLastPatient = currentPage * PATIENTS_PER_PAGE;
    const indexOfFirstPatient = indexOfLastPatient - PATIENTS_PER_PAGE;
    return filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  }, [filteredPatients, currentPage]);

  const filteredRequests = useMemo(() => {
    return pendingRequests.filter(req => 
      req.name.toLowerCase().includes(searchRequest.toLowerCase())
    );
  }, [pendingRequests, searchRequest]);

  const handleAddPatient = (request) => {
    setPendingRequests(prev => prev.filter(r => r.id !== request.id));
    showToast(`${request.name} foi adicionado à sua lista de pacientes!`, 'success');
    if (pendingRequests.length === 1) setShowRequestsModal(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return {
    searchTerm,
    filterStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPatients,
    totalPatients: filteredPatients.length,
    patientsPerPage: PATIENTS_PER_PAGE,
    pendingRequests,
    filteredRequests,
    showRequestsModal,
    setShowRequestsModal,
    searchRequest,
    setSearchRequest,
    openMenuId,
    setOpenMenuId,
    handlers: {
      onSearch: handleSearchChange,
      onFilter: handleFilterChange,
      onAddPatient: handleAddPatient,
      onMenuToggle: handleMenuToggle,
      onFinalizeTreatment: (patientName) => {
        showToast(`Tratamento de ${patientName} finalizado com sucesso!`, 'success');
        setOpenMenuId(null);
      }
    }
  };
};
