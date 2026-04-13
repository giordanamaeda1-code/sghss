import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, PlusCircle, ArrowRight, User, Stethoscope } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('paciente');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password, role);
    if (success) {
      navigate('/');
    } else {
      setError('Credenciais inválidas ou cargo incorreto.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgloginteste.jpg')" }}
    >
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 bg-primary text-white text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2">
            <img src="/SGHSS.png" alt="SGHSS Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold">Sistema de Gestão Hospitalar de Saúde</h2>
          <p className="text-white/70 mt-2">Escolha seu perfil e faça login</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {/* Seleção de Perfil/Cargo */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <button
              type="button"
              onClick={() => setRole('paciente')}
              className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                role === 'paciente' ? 'border-accent bg-accent/10 text-primary' : 'border-gray-100 text-gray-400'
              }`}
            >
              <User size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Paciente</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('medico')}
              className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                role === 'medico' ? 'border-accent bg-accent/10 text-primary' : 'border-gray-100 text-gray-400'
              }`}
            >
              <Stethoscope size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Médico</span>
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 block">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 block">Senha</label>
              <Link to="/forgot-password" size={20} className="text-xs text-primary hover:underline font-medium">Esqueceu?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Entrar no Painel
            <ArrowRight size={20} />
          </button>

          <div className="text-center pt-2 border-t border-gray-100 mt-4">
            <p className="text-sm text-gray-500">
              Não tem uma conta? <Link to="/register" className="text-primary font-bold hover:underline">Cadastre-se aqui</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
