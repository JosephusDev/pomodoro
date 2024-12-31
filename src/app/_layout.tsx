import { Stack } from 'expo-router'
import { colors } from '@/styles/theme'
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik'
import { Loading } from '@/components/loading'
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite'

export default function Layout() {

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tarefas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tarefa TEXT NOT NULL,
          data TEXT NOT NULL,
          hora INTEGER NOT NULL,
          minuto INTEGER NOT NULL,
          status TEXT CHECK(status IN ('Concluido', 'Pendente')) NOT NULL
      );`).then((value)=>console.log(value))
  }

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  })

  if (!fontsLoaded) return <Loading />

  return (
    <SQLiteProvider databaseName="tarefas.db" onInit={createDbIfNeeded}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[600] },
        }}
      />
    </SQLiteProvider>

  )
}
