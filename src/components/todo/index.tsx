import { Text, View, TouchableOpacity } from 'react-native'
import { s } from './styles'
import { IconCalendar, IconCheck, IconCircleCheck, IconCircleFilled, IconTrash } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'
import { format } from 'date-fns'
interface IAgendamento {
	id: number
	tarefa: string
	data: Date
	hora: number
	minuto: number
	status: 'Concluido' | 'Pendente'
	onPressStatus?: () => void
	onPressDelete?: () => void
}

interface TodoProps {
	data: IAgendamento
	onChangeStatus?: () => void
	onDelete?: () => void
	onClick?: () => void
}

export default function Todo({ data, onChangeStatus, onDelete, onClick }: TodoProps) {
	return (
		<View style={s.container}>
			<TouchableOpacity onPress={onChangeStatus}>
				{data.status === 'Concluido' ? (
					<View style={s.circle}>
						<IconCheck size={15} color={'#FFFFFF'} />
					</View>
				) : (
					data.status === 'Pendente' && <IconCircleFilled size={30} color={colors.gray[400]} />
				)}
			</TouchableOpacity>
			<TouchableOpacity onPress={onClick}>
				<View>
					<Text ellipsizeMode='tail' numberOfLines={1} style={s.tarefa}>
						{data.tarefa}
					</Text>
					<View style={s.container_item}>
						<IconCalendar size={20} color={colors.gray[300]} />
						<Text style={s.item}>
							{format(data.data, 'dd/MM/yyyy')} às {String(data.hora).padStart(2, '0')}:
							{String(data.minuto).padStart(2, '0')}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
			<View style={s.trash}>
				<TouchableOpacity onPress={onDelete}>
					<IconTrash color={colors.red.base} />
				</TouchableOpacity>
			</View>
		</View>
	)
}
