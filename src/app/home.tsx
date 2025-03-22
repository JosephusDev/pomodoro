import { Welcome } from '@/components/welcome'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { s } from '@/styles/app/home'
import { colors } from '@/styles/colors'
import { StatusBar } from 'expo-status-bar'
import FloatingButton from '@/components/floating-button'
import { router, useNavigation } from 'expo-router'
import { IconPlus } from '@tabler/icons-react-native'
import { useEffect, useRef, useState } from 'react'
import ListEmpty from '@/components/list-empty'
import Todo from '@/components/todo'
import Resume from '@/components/resume'
import { getTarefas, updateTarefa, deleteTarefa } from '@/models/tarefas'
import { useSQLiteContext } from 'expo-sqlite'
import { ITarefa } from '@/types'
import { Confetti, ConfettiMethods } from 'react-native-fast-confetti'

export default function Home() {
	const confettiRef = useRef<ConfettiMethods>(null)
	const [agendamentos, setAgendamentos] = useState<ITarefa[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const db = useSQLiteContext()

	const handleDelete = async (id: number) => {
		await deleteTarefa(db, id)
		fetchTarefas()
	}

	const handleChangeState = async (id: number, status: 'Concluido' | 'Pendente') => {
		if (status === 'Pendente') {
			confettiRef.current?.restart()
			await updateTarefa(db, id, 'Concluido')
		} else {
			await updateTarefa(db, id, 'Pendente')
		}
		fetchTarefas()
	}

	const fetchTarefas = async () => {
		setIsLoading(true)
		const result = await getTarefas(db)
		if (result) {
			setAgendamentos(result)
		}
		setIsLoading(false)
	}

	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetchTarefas()
		})

		return unsubscribe
	}, [navigation])

	useEffect(() => {
		fetchTarefas()
	}, [])

	const concluidas = agendamentos.filter(a => a.status === 'Concluido').length

	return (
		<View style={s.main}>
			<Welcome title='Lista de Tarefas' subtitle='Gerencie seus estudos agendados.' />
			<Resume criadas={agendamentos.length} concluidas={concluidas} />
			<View style={s.container}>
				{isLoading ? (
					<ActivityIndicator size='small' color={colors.red.base} />
				) : (
					<FlatList
						data={agendamentos}
						keyExtractor={item => String(item.id)}
						renderItem={({ item }) => (
							<Todo
								data={item}
								onChangeStatus={() => handleChangeState(item.id, item.status)}
								onDelete={() => handleDelete(item.id)}
								onClick={() => router.navigate(`/pomodoro?estudo=${item.tarefa}`)}
							/>
						)}
						scrollEnabled={true}
						style={s.flatList}
						ListEmptyComponent={<ListEmpty />}
					/>
				)}
			</View>
			<Confetti ref={confettiRef} autoplay={false} count={100} fadeOutOnEnd />
			<FloatingButton icon={IconPlus} style={{ bottom: 20 }} onPress={() => router.navigate('/create')} />
		</View>
	)
}
