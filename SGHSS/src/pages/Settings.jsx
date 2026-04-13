import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { User, Shield, Bell, Stethoscope, Heart, Save } from 'lucide-react';

// Subcomponentes
import SettingsSidebar from '../components/settings/SettingsSidebar';
import TabGeneral from '../components/settings/TabGeneral';
import TabSecurity from '../components/settings/TabSecurity';
import TabNotifications from '../components/settings/TabNotifications';
import TabProfessional from '../components/settings/TabProfessional';
import TabHealth from '../components/settings/TabHealth';
import TwoFactorModal from '../components/settings/TwoFactorModal';

const Settings = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  
  // Estado da Aplicação
  const [activeTab, setActiveTab] = useState('geral');
  const [isSaving, setIsSaving] = useState(false);
  
  // Estado do 2FA Agrupado
  const [twoFactor, setTwoFactor] = useState({
    isEnabled: false,
    showModal: false,
    isActivating: false,
    step: 1
  });

  const isDoctor = user?.role === 'medico';
  const isPatient = user?.role === 'paciente';

  // Manipuladores de Eventos (Handlers)
  const handleSave = (e) => {
    e.preventDefault();
    if (isSaving) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Configurações salvas com sucesso!', 'success');
    }, 1000);
  };

  const handleToggle2FA = () => {
    if (twoFactor.isEnabled) {
      setTwoFactor(prev => ({ ...prev, isEnabled: false }));
      showToast('2FA desativado com sucesso.', 'info');
    } else {
      setTwoFactor(prev => ({ ...prev, showModal: true, step: 1 }));
    }
  };

  const update2FA = (updates) => setTwoFactor(prev => ({ ...prev, ...updates }));

  const simulate2FAAction = (nextStep, finalEnable = false) => {
    update2FA({ isActivating: true });
    setTimeout(() => {
      update2FA({ 
        isActivating: false, 
        step: nextStep, 
        isEnabled: finalEnable ? true : twoFactor.isEnabled 
      });
    }, 1500);
  };

  // Configuração das Abas
  const tabs = useMemo(() => [
    { id: 'geral', label: 'Geral', icon: <User size={20} />, component: <TabGeneral user={user} /> },
    { id: 'seguranca', label: 'Segurança', icon: <Shield size={20} />, component: <TabSecurity is2FAEnabled={twoFactor.isEnabled} onToggle2FA={handleToggle2FA} /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell size={20} />, component: <TabNotifications /> },
    ...(isDoctor ? [{ id: 'profissional', label: 'Profissional', icon: <Stethoscope size={20} />, component: <TabProfessional user={user} /> }] : []),
    ...(isPatient ? [{ id: 'saude', label: 'Saúde', icon: <Heart size={20} />, component: <TabHealth /> }] : []),
  ], [user, isDoctor, isPatient, twoFactor.isEnabled]);

  const activeComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Configurações</h1>
        <p className="text-gray-500 mt-2">Gerencie suas preferências e informações da conta.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <SettingsSidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1">
          <div className="bg-white rounded-[2.5rem] md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSave} className="space-y-6 md:space-y-8">
              {activeComponent}
              
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <TwoFactorModal 
        isOpen={twoFactor.showModal}
        step={twoFactor.step}
        isActivating={twoFactor.isActivating}
        onClose={() => update2FA({ showModal: false })}
        onSimulateActivation={() => simulate2FAAction(2)}
        onConfirmCode={() => simulate2FAAction(3, true)}
      />
    </div>
  );
};

export default Settings;
