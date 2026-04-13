import React from 'react';
import { FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';

// Este componente mostra dois cartões especiais: um de aviso de prontuários e outro de lembretes
const QuickActionsGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Cartão de Novos Prontuários (Azul Escuro com Gradiente) */}
      <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Novos Prontuários</h3>
          <p className="text-white/70 mb-6">Existe 1 novo prontuário aguardando sua revisão hoje.</p>
          {/* Botão que abre o prontuário em PDF */}
          <a 
            href="/Prontuario SGHSS.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-primary w-fit px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent transition-all group"
          >
            Revisar Agora
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
        {/* Ícone de fundo decorativo e transparente */}
        <FileText size={180} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
      </div>

      {/* Cartão de Lembretes do Dia (Cor de Destaque / Accent) */}
      <div className="bg-accent/30 p-8 rounded-[2rem] border border-accent/50 shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">Lembretes do Dia</h3>
            <p className="text-gray-500 text-sm">Organize sua rotina de atendimentos.</p>
          </div>
        </div>
        
        {/* Lista de tarefas curtas (Lembretes) */}
        <div className="space-y-3">
          {/* Lembrete Pendente */}
          <div className="bg-white/60 p-4 rounded-2xl border border-white flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Ligar para João da Silva (Retorno)</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/50">Hoje, 17:00</span>
          </div>
          {/* Lembrete Concluído (com efeito de riscado e transparência) */}
          <div className="bg-white/60 p-4 rounded-2xl border border-white flex items-center justify-between opacity-60">
            <span className="text-sm font-medium text-primary line-through">Revisar exames de Maria Souza</span>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;
