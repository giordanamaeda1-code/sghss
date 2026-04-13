import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Mail, 
  Shield, 
  Stethoscope, 
  Camera, 
  Edit2, 
  Star, 
  CheckCircle2, 
  Save, 
  X 
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  // Estado de Reputação
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  
  // Estado de Edição de Perfil
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        specialty: user.specialty || ''
      });
    }
  }, [user]);

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      specialty: user.specialty || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Meu Perfil</h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-white border border-gray-200 text-primary font-bold rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Edit2 size={18} />
            Editar Perfil
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
            >
              <X size={18} />
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm active:scale-95"
            >
              <Save size={18} />
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cartão de Perfil */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <User size={64} />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-accent text-primary rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl font-bold text-primary text-center bg-gray-50 border border-gray-100 rounded-xl px-2 py-1 focus:ring-2 focus:ring-primary/20 outline-none w-full"
            />
          ) : (
            <h2 className="text-2xl font-bold text-primary">{user?.name}</h2>
          )}
          
          <p className="text-gray-500 mt-1 capitalize font-medium">{user?.role}</p>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-[200px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat lectus, ultricies eu semper in, commodo ac lorem. Praesent semper purus at sodales placerat.
          </p>
          
          {user?.role === 'medico' && (
            <div className="mt-4 w-full">
              {isEditing ? (
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Sua especialidade"
                  className="mt-1 px-4 py-1.5 bg-white border border-gray-100 text-primary text-sm font-bold rounded-full text-center focus:ring-2 focus:ring-primary/20 outline-none w-full"
                />
              ) : (
                <div className="px-4 py-1.5 bg-accent/20 text-primary text-sm font-bold rounded-full border border-accent/30 inline-block">
                  {user.specialty}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Informações Detalhadas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
            <h3 className="font-bold text-lg text-primary border-b border-gray-100 pb-4">Informações da Conta</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">E-mail</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-primary font-medium bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary/20 outline-none w-full text-sm"
                    />
                  ) : (
                    <p className="text-primary font-medium truncate">{user?.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Cargo / Perfil</p>
                  <p className="text-primary font-medium capitalize">{user?.role}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">ID de Usuário</p>
                  <p className="text-primary font-medium">#0000{user?.id}</p>
                </div>
              </div>

              {user?.role === 'medico' && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shrink-0">
                    <Stethoscope size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Especialidade</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="text-primary font-medium bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary/20 outline-none w-full text-sm"
                      />
                    ) : (
                      <p className="text-primary font-medium truncate">{user?.specialty}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cartão de Reputação */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-primary border-b border-gray-100 pb-4">Reputação e Avaliação do Sistema</h3>
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${rating >= 4 ? 'bg-green-100 text-green-600' : rating >= 3 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                  <Star size={28} fill="currentColor" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-bold">Nota</p>
                    {rating >= 4 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-200">Boa</span>
                    ) : rating >= 3 ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-yellow-200">Neutra</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-200">Ruim</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">Sua pontuação é baseada em atividade recente.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner">
                <div className="flex items-center gap-1 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-all hover:scale-125 active:scale-90"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={32}
                        className={`transition-colors ${(hover || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center min-w-[3rem]">
                  <span className="font-black text-primary text-2xl leading-none">{rating}.0</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Média</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
