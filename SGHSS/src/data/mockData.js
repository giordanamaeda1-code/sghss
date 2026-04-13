export const users = [
  {
    id: 1,
    name: "João da Silva",
    email: "paciente@exemplo.com",
    password: "123",
    role: "paciente",
    specialty: null,
  },
  {
    id: 2,
    name: "Ricardo Sout",
    email: "medico@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Cardiologia",
  },
  {
    id: 3,
    name: "Dra. Marina Costa",
    email: "marina@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Dermatologia",
  },
  {
    id: 4,
    name: "Dr. Alexandre Smith",
    email: "alexandre@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Cardiologia",
  },
  {
    id: 5,
    name: "Dra. Ana Paula Lima",
    email: "ana@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Ginecologia",
  },
  {
    id: 6,
    name: "Dr. Marcos Vinícius",
    email: "marcos@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Neurologia",
  },
  {
    id: 7,
    name: "Dra. Julia Mendes",
    email: "julia@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Pediatria",
  },
  {
    id: 8,
    name: "Dr. Tiago Ramos",
    email: "tiago@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Ortopedia",
  },
  {
    id: 9,
    name: "Dra. Fernanda Rocha",
    email: "fernanda@exemplo.com",
    password: "123",
    role: "medico",
    specialty: "Clínico Geral",
  },
  // Novos Pacientes (Apenas Mock)
  { id: 10, name: "Maria Souza", role: "paciente" },
  { id: 11, name: "João Pedro", role: "paciente" },
  { id: 12, name: "Ana Beatriz", role: "paciente" },
  { id: 13, name: "Carlos Eduardo", role: "paciente" }
];

export const appointments = [
  // Consultas Passadas (ID 1)
  {
    id: 101,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 3,
    doctorName: "Dra. Marina Costa",
    specialty: "Dermatologia",
    date: "2026-02-10",
    time: "14:00",
    status: "Finalizado",
  },
  {
    id: 102,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 8,
    doctorName: "Dr. Tiago Ramos",
    specialty: "Ortopedia",
    date: "2026-02-28",
    time: "10:30",
    status: "Finalizado",
  },
  // Consultas Atuais/Próximas (ID 1)
  {
    id: 1,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 2,
    doctorName: "Ricardo Sout",
    specialty: "Cardiologia",
    date: "2026-03-24", // Hoje (conforme contexto da sessão)
    time: "09:00",
    status: "Confirmado",
  },
  {
    id: 103,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 6,
    doctorName: "Dr. Marcos Vinícius",
    specialty: "Neurologia",
    date: "2026-03-27",
    time: "15:00",
    status: "Confirmado",
  },
  // Consultas Futuras (ID 1)
  {
    id: 104,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 5,
    doctorName: "Dra. Ana Paula Lima",
    specialty: "Ginecologia",
    date: "2026-04-05",
    time: "11:00",
    status: "Confirmado",
  },
  {
    id: 105,
    patientId: 1,
    patientName: "João da Silva",
    doctorId: 9,
    doctorName: "Dra. Fernanda Rocha",
    specialty: "Clínico Geral",
    date: "2026-04-12",
    time: "16:30",
    status: "Confirmado",
  },
  // Outros Pacientes
  {
    id: 2,
    patientId: 10,
    patientName: "Maria Souza",
    doctorId: 2,
    doctorName: "Ricardo Sout",
    specialty: "Cardiologia",
    date: "2026-03-20",
    time: "10:00",
    status: "Confirmado",
  },
  {
    id: 3,
    patientId: 11,
    patientName: "João Pedro",
    doctorId: 2,
    doctorName: "Ricardo Sout",
    specialty: "Cardiologia",
    date: "2026-03-20",
    time: "11:30",
    status: "Pendente",
  },
  {
    id: 4,
    patientId: 12,
    patientName: "Ana Beatriz",
    doctorId: 2,
    doctorName: "Ricardo Sout",
    specialty: "Cardiologia",
    date: "2026-03-21",
    time: "08:00",
    status: "Confirmado",
  },
  {
    id: 5,
    patientId: 13,
    patientName: "Carlos Eduardo",
    doctorId: 2,
    doctorName: "Ricardo Sout",
    specialty: "Cardiologia",
    date: "2026-03-21",
    time: "14:00",
    status: "Confirmado",
  }
];

export const medicalRecords = [
  {
    id: 1,
    patientId: 1,
    patientName: "João da Silva",
    lastVisit: "2026-02-15",
    diagnosis: "Hipertensão",
    medications: ["Lisinopril 10mg"],
    allergies: ["Penicilina"],
  },
  {
    id: 2,
    patientId: 10,
    patientName: "Maria Souza",
    lastVisit: "2026-03-01",
    diagnosis: "Check-up Geral",
    medications: ["Vitamina D"],
    allergies: ["Nenhuma"],
  },
  {
    id: 3,
    patientId: 11,
    patientName: "João Pedro",
    lastVisit: "2026-03-10",
    diagnosis: "Asma leve",
    medications: ["Salbutamol"],
    allergies: ["Pólen"],
  },
  {
    id: 4,
    patientId: 12,
    patientName: "Ana Beatriz",
    lastVisit: "2026-03-12",
    diagnosis: "Anemia ferropriva",
    medications: ["Sulfato Ferroso"],
    allergies: ["Nenhuma"],
  },
  {
    id: 5,
    patientId: 13,
    patientName: "Carlos Eduardo",
    lastVisit: "2026-03-15",
    diagnosis: "Gastrite",
    medications: ["Omeprazol"],
    allergies: ["Lactose"],
  }
];

export const notifications = [
  {
    id: 1,
    userId: 1, // Paciente
    title: "Consulta Confirmada",
    message: "Sua consulta com Ricardo Sout foi confirmada para amanhã às 09:00.",
    type: "success",
    isRead: false,
    timestamp: "2026-03-22T10:30:00",
  },
  {
    id: 2,
    userId: 1, // Paciente
    title: "Novo Resultado de Exame",
    message: "Seu exame de Hemograma já está disponível para visualização.",
    type: "info",
    isRead: true,
    timestamp: "2026-03-21T15:45:00",
  },
  {
    id: 3,
    userId: 2, // Medico
    title: "Novo Agendamento",
    message: "Um novo paciente (Maria Souza) agendou uma consulta para o dia 21/03.",
    type: "info",
    isRead: false,
    timestamp: "2026-03-22T08:15:00",
  },
  {
    id: 4,
    userId: 2, // Medico
    title: "Lembrete de Plantão",
    message: "Seu plantão começa em 2 horas. Prepare-se.",
    type: "warning",
    isRead: false,
    timestamp: "2026-03-23T07:00:00",
  },
];

export const messages = [
  // Mensagens para o Paciente
  {
    id: 1,
    sender: "Sistema",
    subject: "Confirmação de Agendamento",
    preview: "Sua consulta com Ricardo Sout foi confirmada para...",
    content: "Olá, João. Sua consulta com o Ricardo Sout (Cardiologista) foi confirmada para o dia 28/03/2026 às 09:00. Por favor, esteja logado na plataforma com 5 minutos de antecedência.",
    timestamp: "2026-03-24T10:30:00",
    isRead: false,
    type: "system",
    targetRole: "paciente"
  },
  {
    id: 2,
    sender: "Ricardo Sout",
    subject: "Resultado de Exames",
    preview: "Analisei seus últimos exames de sangue e gostaria de...",
    content: "Boa tarde, João. Analisei seus últimos exames de sangue e os níveis de glicose estão dentro do esperado. Vamos manter a medicação atual por mais 30 dias. Qualquer dúvida, estou à disposição.",
    timestamp: "2026-03-24T15:45:00",
    isRead: true,
    type: "doctor",
    targetRole: "paciente"
  },
  {
    id: 3,
    sender: "Sistema",
    subject: "Lembrete de Tratamento",
    preview: "Não se esqueça de registrar seus sintomas diários no...",
    content: "Lembrete diário: Por favor, registre seus sintomas e medições de pressão arterial no painel de registros para que possamos acompanhar sua evolução da melhor forma possível.",
    timestamp: "2026-03-25T08:00:00",
    isRead: false,
    type: "system",
    targetRole: "paciente"
  },
  // Mensagens para o Médico
  {
    id: 5,
    sender: "Maria Souza (Paciente)",
    subject: "Dúvida sobre medicação",
    preview: "Doutor, esqueci se o Lisinopril é para tomar em jejum...",
    content: "Bom dia, Ricardo Sout. Gostaria de tirar uma dúvida rápida: o Lisinopril que o senhor me receitou deve ser tomado em jejum ou após o café da manhã? Acabei perdendo a receita original. Obrigada!",
    timestamp: "2026-03-25T09:15:00",
    isRead: false,
    type: "doctor", // Neste caso, vem de um paciente mas é do tipo comunicação direta
    targetRole: "medico"
  },
  {
    id: 6,
    sender: "Sistema",
    subject: "Novo Prontuário Disponível",
    preview: "O paciente João Pedro anexou novos exames ao histórico...",
    content: "Atenção: O paciente João Pedro acabou de anexar 3 novos arquivos (PDF) ao seu histórico médico. Recomendamos a revisão antes da consulta agendada para amanhã.",
    timestamp: "2026-03-25T11:00:00",
    isRead: false,
    type: "system",
    targetRole: "medico"
  },
  {
    id: 7,
    sender: "Diretoria Clínica",
    subject: "Atualização de Protocolos COVID-19",
    preview: "Informamos que houve uma pequena alteração nos protocolos...",
    content: "Prezados doutores, informamos que a partir da próxima segunda-feira, os protocolos de atendimento presencial para casos suspeitos de síndromes respiratórias serão atualizados. O documento completo está disponível no portal do médico.",
    timestamp: "2026-03-24T16:30:00",
    isRead: true,
    type: "system",
    targetRole: "medico"
  }
];
