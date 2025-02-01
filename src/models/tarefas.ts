import { ITarefa } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";

export const addTarefa = async (db: SQLiteDatabase, data: Omit<ITarefa, "id">) => {
    try {
        await db.runAsync(`INSERT INTO tarefas (tarefa, data, hora, minuto, status) VALUES (?, ?, ?, ?, ?);`, [
            data.tarefa,
            data.data.toISOString(),
            data.hora,
            data.minuto,
            "Pendente",
          ]).then((result)=>console.log(result))
    } catch (error) {
        console.log(error);
    }
};

export const getTarefas = async (db: SQLiteDatabase) => {
  try {
    const result = await db.getAllAsync<ITarefa>('SELECT * FROM tarefas');
    return result
  } catch (error) {
    console.log(error);
  }
};

export const updateTarefa = async (db: SQLiteDatabase, id: number, status: "Concluido" | "Pendente") => {
    try {
        await db.runAsync(`UPDATE tarefas set status = ? where id = ?;`, [status, id])
        .then((result)=>console.log(result))
    } catch (error) {
        console.log(error);
    }
};

export const deleteTarefa = async (db: SQLiteDatabase, id: number) => {
    try {
        await db.runAsync(`DELETE FROM tarefas where id = ?;`, [id])
        .then((result)=>console.log(result))
    } catch (error) {
        console.log(error);
    }
};
