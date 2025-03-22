import { ScrollView, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '@/components/button'
import { IconBellOff, IconClockHour1, IconClockStop, IconDots, IconRobotFace, IconX } from '@tabler/icons-react-native'
import { useEffect, useRef, useState } from 'react'
import Input from '@/components/Input'
import { s } from '@/styles/app/create'
import { colors } from '@/styles/colors'
import { Audio } from 'expo-av'
import MyModal from '@/components/my-modal'
import { getPomodoroPlan } from '@/services/api'
import { useLocalSearchParams } from 'expo-router'
import { scheduleNotification, scheduleRestNotification } from '@/services/notifications'

export default function Pomodoro() {
	const Alarme = require('@/assets/sounds/alarme.wav')

	const { estudo } = useLocalSearchParams()
	const [show, setShow] = useState(false)
	const [duration, setDuration] = useState(25)
	const [descanso, setDescanso] = useState(5)
	const [hora, setHora] = useState(0)
	const [minuto, setMinuto] = useState(0)
	const [segundo, setSegundo] = useState(0)
	const [inicio, setInicio] = useState<Date>(new Date())
	const contando = useRef(false)
	const [dateChanged, setDateChanged] = useState(false)
	const [watchDuration, setWatchDuration] = useState<Date>(new Date())
	const [isDescanso, setIsDescanso] = useState(false)
	const [sound, setSound] = useState<Audio.Sound>()
	const [playing, setPlaying] = useState(false)
	const [pomodoroPlan, setPomodoroPlan] = useState<String>('')
	const [tema, setTema] = useState<string | ''>(String(estudo) || '')
	const [isLoading, setIsLoading] = useState(false)
	const [pomodoroPlanVisible, setPomodoroPlanVisible] = useState(false)
	const [isNotificatedForRest, setIsNotificatedForRest] = useState(false)

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(Alarme)
		setSound(sound)
		setPlaying(true)
		await sound.playAsync()
	}

	const stopSound = async () => {
		if (sound) {
			setPlaying(false)
			await sound.stopAsync()
		}
	}

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync()
				}
			: undefined
	}, [sound])

	const reset = () => {
		setHora(0)
		setMinuto(0)
		setSegundo(0)
		contando.current = false
	}

	const iniciarDescanso = () => {
		const now = new Date()
		now.setMinutes(now.getMinutes() + descanso)
		setWatchDuration(now)
		setIsDescanso(true)
		contando.current = true
	}

	useEffect(() => {
		const interval = setInterval(() => {
			// obter a hora, minuto e segundo atual
			const now = new Date()
			const horaAtual = now.getHours()
			const minutoAtual = now.getMinutes()
			const segundoAtual = now.getSeconds()

			//se chegar a hora de estudos, agenda o início e o fim do descanso e inicia o cronômetro
			if (horaAtual === hora && minutoAtual === minuto) {
				contando.current = true // inicia o cronômetro
				// se a hora de descanso, agenda o início e o fim do descanso
				if (!isNotificatedForRest) {
					const rest_time = new Date(now)
					// descanso começa quando a duração do tempo de estudo for atingida
					rest_time.setMinutes(rest_time.getMinutes() + duration)
					const end_rest_time = new Date(now)
					// descanso termina quando o a duração de descanso for atingida
					end_rest_time.setMinutes(end_rest_time.getMinutes() + (duration + descanso))
					console.log(`Descanso foi agendado para: ${rest_time} até às ' + ${end_rest_time}`)
					// agenda o tempo de descanso
					scheduleRestNotification(rest_time, end_rest_time)
					setIsNotificatedForRest(true)
				}
			}
			// se o cronômetro estiver ativo muda a hora, minuto e segundo para o tempo actual a cada segundo
			if (contando.current && dateChanged) {
				setHora(horaAtual)
				setMinuto(minutoAtual)
				setSegundo(segundoAtual)
			} else if (!dateChanged) {
				// termina com o cronômetro
				reset()
			}
			// se chegar a hora de descanso termina o cronômetro
			if (
				watchDuration.getHours() === now.getHours() &&
				watchDuration.getMinutes() === now.getMinutes() &&
				contando.current
			) {
				reset()
				// se não estiver descansando, toca o som, notifica para descansar e inicia o descanso
				if (!isDescanso) {
					playSound()
					iniciarDescanso()
				} else {
					// caso esteja descansando, toca o som para notificar o fim do descanso e termina o cronômetro
					playSound()
					setIsDescanso(false)
					setDateChanged(false)
				}
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [dateChanged, isDescanso, isNotificatedForRest])

	const fetchPomodoroPlan = async () => {
		if (pomodoroPlan || !tema) {
			setPomodoroPlanVisible(true)
			return
		}
		setIsLoading(true)
		const response = await getPomodoroPlan(tema)
		setIsLoading(false)
		setPomodoroPlan(response)
		setPomodoroPlanVisible(true)
	}

	return (
		<ScrollView>
			<View style={s.main}>
				<Text style={s.label}>O que vai estudar?</Text>
				<View style={s.InputGroup}>
					<Input
						value={tema}
						onValueChange={value => {
							setTema(value)
							setPomodoroPlan('')
						}}
						placeholder='Ex.: Anatomia'
						style={{ width: '82%', paddingVertical: 5, textAlign: 'center' }}
					/>
					<Button
						onClick={() => {
							fetchPomodoroPlan()
						}}
						icon={isLoading ? IconDots : IconRobotFace}
						disabled={isLoading}
						style={{ backgroundColor: colors.red.base }}
					/>
				</View>
				<Text style={s.label}>Duração em minutos</Text>
				<Input
					keyboardType='decimal-pad'
					value={String(duration)}
					onValueChange={value => {
						setDuration(Number(value))
					}}
				/>
				<Text style={s.label}>Tempo de descanso</Text>
				<Input
					keyboardType='decimal-pad'
					value={String(descanso)}
					onValueChange={value => setDescanso(Number(value))}
				/>
				<View style={s.containerButton}>
					{contando.current ? (
						<Button
							title='Parar'
							onClick={() => setDateChanged(false)}
							icon={IconClockStop}
							style={{ backgroundColor: colors.red.base, width: '100%' }}
						/>
					) : (
						<Button
							title='Hora de início'
							onClick={() => setShow(true)}
							icon={IconClockHour1}
							style={{ backgroundColor: colors.gray[500], width: '100%' }}
						/>
					)}
				</View>
				{show && (
					<DateTimePicker
						testID='dateTimePicker'
						value={inicio}
						mode='time'
						is24Hour={true}
						display='spinner'
						onChange={(event, selectedDate) => {
							if (selectedDate) {
								console.log('Estudo foi agendado: ' + selectedDate)
								setInicio(selectedDate)
								setHora(selectedDate.getHours())
								setMinuto(selectedDate.getMinutes())
								setDateChanged(true)
								contando.current = false
								// Crie uma nova instância de Date para evitar modificar o objeto original
								const _datetime = new Date(selectedDate)
								_datetime.setMinutes(_datetime.getMinutes() + duration)
								setWatchDuration(_datetime)
								scheduleNotification(selectedDate, tema)
							}
							setShow(false)
						}}
					/>
				)}
				{dateChanged && (
					<View>
						{!contando.current ? (
							<Text style={s.alerta}>Seu estudo começará às</Text>
						) : isDescanso ? (
							<Text style={s.alerta}>Aproveite o descanso!</Text>
						) : (
							<Text style={s.alerta}>Bons estudos!</Text>
						)}
						<Text
							style={[
								{
									color: contando.current ? colors.red.base : colors.gray[100],
								},
								s.temporizador,
							]}
						>
							{String(hora).padStart(2, '0')} : {String(minuto).padStart(2, '0')} : {String(segundo).padStart(2, '0')}
						</Text>
					</View>
				)}
				<MyModal title={pomodoroPlan ? 'Recomendação' : 'Nota Importante!'} visible={pomodoroPlanVisible}>
					<Text style={s.descriptionIA}>
						{pomodoroPlan
							? pomodoroPlan
							: 'Informe o que vai estudar se deseja receber sugestões de estudo e gestão de tempo através de Inteligência Artificial'}
					</Text>
					<Button
						title='Fechar'
						onClick={() => setPomodoroPlanVisible(false)}
						icon={IconX}
						style={{ backgroundColor: colors.red.base, height: 40, marginTop: 10 }}
					/>
				</MyModal>
				<MyModal
					visible={playing}
					title={isDescanso ? 'Hora de descansar' : 'Descanso concluído.'}
					subtitle={
						isDescanso
							? `Aproveite descansar até às ${watchDuration.getHours()}H : ${watchDuration.getMinutes()}min`
							: 'Volte a marcar mais um ciclo de estudos!'
					}
				>
					<Button
						title='Parar alarme'
						onClick={stopSound}
						icon={IconBellOff}
						style={{ backgroundColor: colors.red.base, height: 40, marginTop: 10 }}
					/>
				</MyModal>
			</View>
		</ScrollView>
	)
}
