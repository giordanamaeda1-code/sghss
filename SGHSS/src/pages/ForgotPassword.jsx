import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, PlusCircle, CheckCircle2, Send } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio de e-mail de recuperação
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgloginteste.jpg')" }}
    >
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-10 bg-primary text-white text-center relative overflow-hidden">
          {/* Elemento decorativo de fundo */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10 transition-transform hover:scale-105 p-3">
            <img src="/SGHSS.png" alt="SGHSS Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Recuperar Senha</h2>
          <p className="text-white/70 mt-3 font-medium">Enviaremos as instruções por e-mail</p>
        </div>
        
        <div className="p-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Seu E-mail cadastrado</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-sm font-medium"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 disabled:opacity-70 group"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Enviar Link de Recuperação
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 font-bold hover:text-primary transition-colors group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Voltar para o Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner shadow-green-200/50 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">Verifique seu E-mail</h3>
                <p className="text-gray-500 mt-3 leading-relaxed font-medium">
                  Enviamos um link de recuperação para <span className="text-primary font-bold">{email}</span>.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">Não recebeu o e-mail? Verifique sua caixa de spam ou <button onClick={() => setIsSubmitted(false)} className="text-primary font-bold hover:underline">tente novamente</button>.</p>
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Ir para o Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
