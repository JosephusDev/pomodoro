export interface ITarefa {
  id: number;
  tarefa: string;
  data: Date;
  hora: number;
  minuto: number;
  status: "Concluido" | "Pendente";
}