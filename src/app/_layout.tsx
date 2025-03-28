import { router, Stack } from 'expo-router'
import { colors } from '@/styles/theme'
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { Loading } from '@/components/loading'
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

export default function Layout() {
	const createDbIfNeeded = async (db: SQLiteDatabase) => {
		await db
			.execAsync(`
	  CREATE TABLE IF NOT EXISTS tarefas (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  tarefa TEXT NOT NULL,
		  data TEXT NOT NULL,
		  hora INTEGER NOT NULL,
		  minuto INTEGER NOT NULL,
		  status TEXT CHECK(status IN ('Concluido', 'Pendente')) NOT NULL
	  );`)
			.then(value => console.log(value))
	}

	const [fontsLoaded] = useFonts({
		Rubik_400Regular,
		Rubik_500Medium,
		Rubik_600SemiBold,
		Rubik_700Bold,
	})

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) return <Loading />

	return (
		<SQLiteProvider databaseName='tarefas.db' onInit={createDbIfNeeded}>
			<StatusBar backgroundColor={colors.gray[600]} style='light' />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: colors.gray[600] },
					headerTitleAlign: 'center',
					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<Feather name='chevron-left' size={25} color={colors.red.base} />
						</Pressable>
					),
				}}
			>
				<Stack.Screen name='index' />
				<Stack.Screen name='home' />
				<Stack.Screen
					name='create'
					options={{
						headerShown: true,
						title: 'Agendar estudo',
						headerStyle: {
							backgroundColor: colors.gray[600],
						},
						headerTitleStyle: {
							fontFamily: 'Rubik_500Medium',
						},
						headerTintColor: '#FFFFFF',
					}}
				/>
				<Stack.Screen
					name='pomodoro'
					options={{
						headerShown: true,
						title: 'Modo Foco',
						headerStyle: {
							backgroundColor: colors.gray[600],
						},
						headerTitleStyle: {
							fontFamily: 'Rubik_500Medium',
						},
						headerTintColor: '#FFFFFF',
					}}
				/>
			</Stack>
		</SQLiteProvider>
	)
}
