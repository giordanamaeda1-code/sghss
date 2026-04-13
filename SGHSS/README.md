# SGHSS - Sistema de Gestão Hospitalar e de Serviços de Saúde

Este documento fornece uma visão detalhada e técnica do projeto **SGHSS**, desenvolvido para a instituição **VidaPlus**. O sistema foi projetado para oferecer uma experiência moderna, acessível e eficiente na gestão de serviços de saúde, conectando pacientes e profissionais em uma plataforma única.

---

## 1. Visão Geral do Projeto

O **SGHSS** é uma plataforma de gestão em saúde focada na jornada do paciente e na produtividade do médico. O objetivo principal é centralizar agendamentos, teleconsultas e prontuários em um ambiente intuitivo e responsivo.

### Usuários-Alvo
*   **Pacientes:** Buscam facilidade para agendar consultas, visualizar históricos médicos e realizar teleatendimentos.
*   **Médicos:** Necessitam de uma visão clara da agenda do dia, lista de pacientes e ferramentas para conduzir consultas remotas.

---

## 2. Stack Tecnológica

A escolha das tecnologias baseou-se em performance, escalabilidade e facilidade de manutenção:

*   **React (Vite):** Biblioteca principal para construção da UI. O Vite foi escolhido como build tool pela sua velocidade de desenvolvimento (HMR) e otimização de bundle.
*   **Tailwind CSS:** Framework CSS utilitário que permite um design altamente customizado, consistente e responsivo sem sair do HTML/JSX.
*   **React Router DOM:** Gerenciamento de rotas e navegação SPA (Single Page Application), permitindo transições fluidas entre páginas.
*   **Lucide React:** Conjunto de ícones leves e consistentes, essenciais para uma interface visualmente clara e acessível.

---

## 3. Estrutura do Projeto

O código está organizado seguindo padrões de arquitetura modular para facilitar a escalabilidade:

```text
src/
├── components/ # Componentes reutilizáveis (Header, Sidebar, Cards)
├── pages/      # Telas principais da aplicação (Dashboard, Login, etc.)
├── layouts/    # Estruturas de página (MainLayout, ProtectedRoute)
├── hooks/      # Lógica de estado global e autenticação (useAuth)
├── data/       # Simulação de base de dados (mockData.js)
├── Router.jsx  # Definição centralizada de rotas
├── App.jsx     # Ponto de entrada com provedores de contexto
└── index.css   # Configurações globais do Tailwind
```

---

## 4. Funcionalidades Implementadas

### Sistema de Autenticação
Implementado via **React Context API**, o sistema gerencia o estado global do usuário. As credenciais são persistidas no `localStorage`, permitindo que o usuário permaneça logado após atualizar a página.

### Interface Baseada em Cargos (RBAC)
A interface se adapta dinamicamente ao cargo do usuário:
*   **Sidebar Dinâmica:** Links como "Agendamento" aparecem apenas para pacientes, enquanto "Lista de Pacientes" é exclusivo para médicos.
*   **Dashboard Adaptativo:** Gráficos e tabelas mudam de contexto (Ex: Médico vê "Consultas do Dia", Paciente vê "Meus Agendamentos").

### Fluxo de Agendamento
Um formulário multi-etapas (Wizard) que guia o paciente na escolha de especialidade, médico, data e confirmação, reduzindo a carga cognitiva e erros de preenchimento.

### Teleconsulta (Mockup UI)
Interface de alta fidelidade simulando uma chamada de vídeo, com controles de mídia (microfone, câmera), chat em tempo real e indicadores de status.

---

## 5. Roteamento e Segurança

O projeto utiliza **Rotas Protegidas** para garantir a segurança dos dados:
1.  **Rotas Públicas:** Login e Cadastro são acessíveis a todos.
2.  **Filtro de Autenticação:** Rotas internas redirecionam para `/login` se não houver usuário ativo.
3.  **Filtro de Cargo:** Mesmo autenticado, um paciente não pode acessar rotas exclusivas de médicos (e vice-versa), sendo redirecionado para o painel principal.

---

## 6. Gestão de Dados (Mock Data)

Como o projeto não possui backend nesta fase, os dados são simulados em `src/data/mockData.js`:
*   **Users:** Lista de usuários pré-cadastrados para teste.
*   **Appointments:** Relaciona pacientes e médicos com datas e status.
*   **Medical Records:** Simula o histórico clínico dos pacientes.

---

## 7. Decisões de UI/UX e Acessibilidade

### Design System (Health Tech)
*   **Cores:** 
    *   `Primary` (#2D3250 - Indigo Profundo): Transmite autoridade, segurança e confiança.
    *   `Accent` (#70FFB8 - Verde Menta): Associado à saúde, limpeza e ações positivas.
    *   `Background` (#F8FAFC): Cinza ultra-claro para reduzir o cansaço visual.
*   **Responsividade:** Sidebar colapsável e layouts em grid/flexbox que se adaptam de smartphones a monitores ultrawide.

### Acessibilidade (WCAG)
*   Uso de **HTML Semântico** (`<header>`, `<main>`, `<nav>`, `<table>`).
*   Contraste de cores validado para legibilidade.
*   Feedback visual claro em estados de `hover`, `focus` e `active`.

---

## 8. Como Executar o Projeto

Para rodar o SGHSS localmente, siga os passos:

1.  **Instalação de Dependências:**
    ```bash
    npm install
    ```
2.  **Iniciar Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
3.  **Acessar a Aplicação:**
    Abra o navegador no endereço indicado pelo terminal (geralmente `http://localhost:5173`).

### Credenciais de Teste:
*   **Paciente:** `paciente@exemplo.com` / Senha: `123`
*   **Médico:** `medico@exemplo.com` / Senha: `123`

---

## 9. Melhorias Futuras

1.  **Integração com Backend:** Implementação de uma API (Node.js/Python) e banco de dados real (PostgreSQL).
2.  **Vídeo em Tempo Real:** Integração com **WebRTC** ou serviços como Twilio/Agora para chamadas de vídeo reais.
3.  **Notificações:** Alertas via Push ou E-mail para lembrar pacientes de consultas próximas.
4.  **Assinatura Digital:** Integração com certificados ICP-Brasil para receitas médicas válidas.

---
**Desenvolvido como projeto acadêmico - Instituição VidaPlus.**
