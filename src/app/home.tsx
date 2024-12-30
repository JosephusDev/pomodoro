import { Welcome } from '@/components/welcome'
import { ScrollView, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '@/components/button'
import {
  IconBellOff,
  IconClockHour1,
  IconClockStop,
  IconDots,
  IconRobotFace,
  IconX,
} from '@tabler/icons-react-native'
import { useEffect, useRef, useState } from 'react'
import Input from '@/components/Input'
import { s } from '@/styles/app/home'
import { colors } from '@/styles/colors'
import { Audio } from 'expo-av'
import MyModal from '@/components/my-modal'
import { StatusBar } from 'expo-status-bar'
import { getPomodoroPlan } from '@/services/api'


export default function Home() {

  const Alarme = require('@/assets/sounds/alarme.wav')

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
  const [tema, setTema] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pomodoroPlanVisible, setPomodoroPlanVisible] = useState(false)

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
      const now = new Date()
      const horaAtual = now.getHours()
      const minutoAtual = now.getMinutes()
      const segundoAtual = now.getSeconds()

      if (horaAtual === hora && minutoAtual === minuto) {
        contando.current = true
      }

      if (contando.current && dateChanged) {
        setHora(horaAtual)
        setMinuto(minutoAtual)
        setSegundo(segundoAtual)
      } else if (!dateChanged) {
        reset()
      }

      if (
        watchDuration.getHours() === now.getHours() &&
        watchDuration.getMinutes() === now.getMinutes() &&
        contando.current
      ) {
        reset()
        if (!isDescanso) {
          playSound()
          iniciarDescanso()
        } else {
          playSound()
          setIsDescanso(false)
          setDateChanged(false)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [dateChanged, isDescanso])

  const fetchPomodoroPlan = async () => {
    if (pomodoroPlan || !tema){
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
        <StatusBar backgroundColor={colors.gray[600]} style='light' />
        <Welcome
          title='Pomodoro'
          subtitle='Planeie seus estudos de forma inteligente!'
        />
        <View style={s.container}>
          <Text style={s.label}>Tema a estudar</Text>
          <View style={s.InputGroup}>
            <Input
              value={tema}
              onValueChange={(value) => {
                setTema(value)
                setPomodoroPlan('')
              }}
              placeholder="Ex.: Anatomia"
              style={{ width: '82%' }}
            />
            <Button
              onClick={()=>{
                fetchPomodoroPlan()
              }}
              icon={isLoading ? IconDots : IconRobotFace}
              disabled={isLoading}
            />
          </View>
          <Text style={s.label}>Duração em minutos</Text>
          <Input
            keyboardType='decimal-pad'
            value={String(duration)}
            onValueChange={(value) => {
              setDuration(Number(value))
            }}
          />
          <Text style={s.label}>Tempo de descanso</Text>
          <Input
            keyboardType='decimal-pad'
            value={String(descanso)}
            onValueChange={(value) => setDescanso(Number(value))}
          />
          <View style={s.containerButton}>
            {contando.current ? (
              <Button
                title='Parar'
                onClick={() => setDateChanged(false)}
                icon={IconClockStop}
              />
            ) : (
              <Button
                title='Hora de início'
                onClick={() => setShow(true)}
                icon={IconClockHour1}
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
                  setInicio(selectedDate)
                  setHora(selectedDate.getHours())
                  setMinuto(selectedDate.getMinutes())
                  setDateChanged(true)
                  contando.current = false
                  selectedDate.setMinutes(selectedDate.getMinutes() + duration)
                  setWatchDuration(selectedDate)
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
                    color: contando.current
                      ? colors.red.base
                      : colors.gray[100],
                  },
                  s.temporizador,
                ]}
              >
                {String(hora).padStart(2, '0')} :{' '}
                {String(minuto).padStart(2, '0')} :{' '}
                {String(segundo).padStart(2, '0')}
              </Text>
            </View>
          )}
          <MyModal
            title={pomodoroPlan ? 'Recomendação' : 'Nota Importante!'}
            visible={pomodoroPlanVisible}
          >
            <Text style={s.descriptionIA}>{pomodoroPlan ? pomodoroPlan : 'Informe um Tema para receber sugestões de estudo com IA'}</Text>
            <Button
              title='Fechar'
              onClick={() => setPomodoroPlanVisible(false)}
              icon={IconX}
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
            />
          </MyModal>
        </View>
      </View>
    </ScrollView>
  )
}
