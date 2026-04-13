import React from 'react';
import { Outlet } from 'react-router-dom'; // O Outlet é onde as páginas (Dashboard, Agenda, etc.) serão renderizadas
import Sidebar from '../components/Sidebar'; // A barra lateral do menu
import Header from '../components/Header'; // O cabeçalho no topo da página

const MainLayout = () => {
  return (
    // Esse contêiner principal define a imagem de fundo e o estilo de fonte
    <div 
      className="flex min-h-screen bg-cover bg-fixed bg-center text-primary font-sans"
      style={{ backgroundImage: "url('/bgloginteste.jpg')" }}
    >
      {/* Sidebar fica fixo na esquerda */}
      <Sidebar />
      
      {/* A parte da direita ocupa o resto da tela e contém o Header e o conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Aqui embaixo fica o conteúdo que muda de acordo com o link clicado */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* O Outlet funciona como um "espaço reservado" para as páginas do sistema */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
