import React from 'react';

// O StatCard é um pequeno cartão que mostra um ícone e um número (estatística)
// O sistema de "themes" permite mudar as cores de fundo e do ícone de forma fácil
const themes = {
  blue: "bg-blue-100 text-blue-600", // Estilo para azul
  accent: "bg-accent/20 text-primary", // Estilo principal do projeto
  purple: "bg-purple-100 text-purple-600", // Estilo para roxo
  green: "bg-green-100 text-green-600", // Estilo para verde (geralmente sucesso)
};

const StatCard = ({ label, value, icon: Icon, theme = "blue" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    {/* Contêiner do ícone que muda de cor conforme o tema escolhido */}
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${themes[theme]}`}>
      <Icon size={24} />
    </div>
    
    {/* Texto que explica o que é o número e o valor da estatística */}
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  </div>
);

export default StatCard;
