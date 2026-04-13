import React from 'react';
import { UserPlus } from 'lucide-react';

// Ganchos de Estado (Hooks)
import { usePatients } from '../hooks/usePatients';

// Componentes
import PatientStats from '../components/patients/PatientStats';
import PatientFilters from '../components/patients/PatientFilters';
import PatientTable from '../components/patients/PatientTable';
import RequestsModal from '../components/patients/RequestsModal';
import QuickActionsGrid from '../components/patients/QuickActionsGrid';
import Pagination from '../components/common/Pagination';

const Patients = () => {
  const {
    searchTerm,
    filterStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPatients,
    totalPatients,
    patientsPerPage,
    pendingRequests,
    filteredRequests,
    showRequestsModal,
    setShowRequestsModal,
    searchRequest,
    setSearchRequest,
    openMenuId,
    setOpenMenuId,
    handlers
  } = usePatients();

  return (
    <div className="space-y-8 pb-10" onClick={() => setOpenMenuId(null)}>
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestão de Pacientes</h1>
          <p className="text-gray-500 mt-1">Gerencie seu painel de pacientes e histórico médico.</p>
        </div>
        <button 
          onClick={() => setShowRequestsModal(true)}
          className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all"
        >
          <UserPlus size={20} />
          Novos Pacientes ({pendingRequests.length})
        </button>
      </div>

      <PatientStats totalPatients={totalPatients} pendingCount={pendingRequests.length} />

      {/* Cartão de Conteúdo Principal */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <PatientFilters 
          searchTerm={searchTerm}
          onSearchChange={handlers.onSearch}
          filterStatus={filterStatus}
          onFilterChange={handlers.onFilter}
        />

        <PatientTable 
          patients={currentPatients}
          openMenuId={openMenuId}
          handlers={handlers}
        />

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalPatients}
          itemsPerPage={patientsPerPage}
          indexOfFirstItem={(currentPage - 1) * patientsPerPage}
          indexOfLastItem={currentPage * patientsPerPage}
        />
      </div>

      <RequestsModal 
        isOpen={showRequestsModal}
        onClose={() => setShowRequestsModal(false)}
        searchRequest={searchRequest}
        onSearchRequestChange={setSearchRequest}
        requests={filteredRequests}
        onAddPatient={handlers.onAddPatient}
      />

      <QuickActionsGrid />
    </div>
  );
};

export default Patients;
