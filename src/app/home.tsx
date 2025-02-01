import { Welcome } from '@/components/welcome'
import { FlatList, View } from 'react-native'
import { s } from '@/styles/app/home'
import { colors } from '@/styles/colors'
import { StatusBar } from 'expo-status-bar'
import FloatingButton from '@/components/floating-button'
import { router } from 'expo-router'
import { IconPlus } from '@tabler/icons-react-native'
import { useEffect, useState } from 'react'
import ListEmpty from '@/components/list-empty'
import Todo from '@/components/todo'
import Resume from '@/components/resume'
import { getTarefas, updateTarefa, deleteTarefa } from '@/models/tarefas'
import { useSQLiteContext } from 'expo-sqlite'
import { ITarefa } from '@/types'

export default function Home() {
	const [agendamentos, setAgendamentos] = useState<ITarefa[]>([])

	const db = useSQLiteContext()

	const handleDelete = async (id: number) => {
		await deleteTarefa(db, id)
	}

	const handleChangeState = async (id: number, status: 'Concluido' | 'Pendente') => {
		if (status === 'Pendente') {
			await updateTarefa(db, id, 'Concluido')
		} else {
			await updateTarefa(db, id, 'Pendente')
		}
	}

	const fetchTarefas = async () => {
		const result = await getTarefas(db)
		if (result) {
			setAgendamentos(result)
		}
	}

	useEffect(() => {
		fetchTarefas()
	}, [agendamentos])

	const concluidas = agendamentos.filter(a => a.status === 'Concluido').length

	return (
		<View style={s.main}>
			<Welcome title='Lista de Tarefas' subtitle='Gerencie seus estudos agendados.' />
			<Resume criadas={agendamentos.length} concluidas={concluidas} />
			<View style={s.container}>
				{agendamentos.length <= 0 ? (
					<ListEmpty />
				) : (
					<FlatList
						data={agendamentos}
						keyExtractor={item => String(item.id)}
						renderItem={({ item }) => (
							<Todo
								data={item}
								onPressStatus={() => handleChangeState(item.id, item.status)}
								onPressDelete={() => handleDelete(item.id)}
								onClick={() => router.navigate(`/pomodoro?estudo=${item.tarefa}`)}
							/>
						)}
						scrollEnabled={true}
						style={s.flatList}
					/>
				)}
			</View>
			<FloatingButton icon={IconPlus} style={{ bottom: 20 }} onPress={() => router.navigate('/create')} />
		</View>
	)
}
