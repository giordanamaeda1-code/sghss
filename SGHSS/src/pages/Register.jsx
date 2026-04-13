import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, PlusCircle, ArrowRight, User, Stethoscope, UserPlus, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// Esta página permite que novos usuários (Médicos ou Pacientes) criem uma conta no sistema
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Puxa a função de cadastro do nosso sistema de autenticação
  
  // Estado que guarda todos os dados digitados no formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'paciente', // Valor padrão é paciente
    specialty: '',
    crm: ''
  });

  // Função que roda quando o usuário clica em "Cadastrar"
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(formData); // Tenta cadastrar o usuário
    if (success) {
      navigate('/'); // Se der certo, manda para a página inicial (Dashboard)
    }
  };

  // Função genérica que atualiza o estado conforme o usuário digita nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgloginteste.jpg')" }}
    >
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 bg-primary text-white text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2">
            <img src="/SGHSS.png" alt="SGHSS Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold">Crie sua Conta</h2>
          <p className="text-white/70 mt-2">Junte-se à maior rede de saúde integrada</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Botões para escolher se você é Paciente ou Médico */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <button
              type="button"
              onClick={() => setFormData(p => ({...p, role: 'paciente', specialty: '', crm: ''}))}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                formData.role === 'paciente' ? 'border-accent bg-accent/10 text-primary' : 'border-gray-100 text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">Paciente</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData(p => ({...p, role: 'medico'}))}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                formData.role === 'medico' ? 'border-accent bg-accent/10 text-primary' : 'border-gray-100 text-gray-400'
              }`}
            >
              <Stethoscope size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">Médico</span>
            </button>
          </div>

          {/* Campo de Nome */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 block">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                name="name"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none"
                placeholder="Ex: João da Silva"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CAMPOS EXTRAS: Aparecem apenas se o usuário escolher ser "Médico" */}
          {formData.role === 'medico' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 block">CRM</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="crm"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none"
                    placeholder="00000-UF"
                    value={formData.crm}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 block">Especialidade</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="specialty"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none"
                    placeholder="Ex: Cardiologia"
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Campo de E-mail */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 block">E-mail Profissional/Pessoal</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 block">Crie uma Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                name="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none"
                placeholder="No mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botão Final de Cadastro */}
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] mt-6 shadow-lg shadow-primary/20"
          >
            Cadastrar no Sistema
            <ArrowRight size={20} />
          </button>

          <div className="text-center pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-gray-500">
              Já tem uma conta? <Link to="/login" className="text-primary font-bold hover:underline">Fazer Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
