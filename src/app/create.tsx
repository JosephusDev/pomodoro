import { Welcome } from '@/components/welcome'
import { ScrollView, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '@/components/button'
import {
  IconCalendar,
  IconClockHour1,
  IconPlus,
  IconX,
} from '@tabler/icons-react-native'
import { useEffect, useState } from 'react'
import Input from '@/components/Input'
import { s } from '@/styles/app/create'
import { colors } from '@/styles/colors'
import MyModal from '@/components/my-modal'
import { StatusBar } from 'expo-status-bar'
import { scheduleNotification } from '@/services/notifications';
import { addTarefa } from '@/models/tarefas'
import { useSQLiteContext } from 'expo-sqlite'


export default function CreateTask() {

  const [showDate, setShowDate] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [data, setData] = useState<Date>(new Date())
  const [tempo, setTempo] = useState<Date>(new Date())
  const [tema, setTema] = useState('')
  const [agendado, setAgendado] = useState(false)
  const db = useSQLiteContext();

  const CallScheduleNotification = async () => {
    await addTarefa(db, {
      tarefa: tema,
      data: data,
      hora: data.getHours(),
      minuto: data.getMinutes(),
      status: 'Pendente'
    })
    scheduleNotification(data, tema)
    setAgendado(true)
  }


  return (
    <ScrollView>
      <View style={s.main}>
        <StatusBar backgroundColor={colors.gray[600]} style='light' />
        <Welcome
          title='Agendar estudo'
          subtitle='Agende aqui o quê e quando irá estudar.'
        />
        <View style={s.container}>
          <Text style={s.label}>O que vai estudar?</Text>
          <Input
            value={tema}
            onValueChange={(value) => {
              setTema(value)
            }}
            placeholder="Ex.: Anatomia"
          />
          <View style={s.containerButton}>
            <Button
              title='Data'
              onClick={() => setShowDate(true)}
              icon={IconCalendar}
              style={{width: '50%', backgroundColor: colors.gray[500]}}
            />
            <Button
              title='Hora'
              onClick={() => setShowTime(true)}
              icon={IconClockHour1}
              style={{width: '50%', backgroundColor: colors.gray[500]}}
            />
          </View>
          <Button
            title='Adicionar'
            icon={IconPlus}
            onClick={CallScheduleNotification}
            style={{backgroundColor: colors.red.base, marginTop: 20}}
          />
          {showDate && (
            <DateTimePicker
              testID='datePicker'
              value={data}
              mode='date'
              display='spinner'
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setData(selectedDate)
                }
                setShowDate(false)
              }}
            />
          )}
          {showTime && (
            <DateTimePicker
              testID='timePicker'
              value={tempo}
              mode='time'
              is24Hour={true}
              display='spinner'
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  setTempo(selectedTime)
                  data.setHours(selectedTime.getHours())
                  data.setMinutes(selectedTime.getMinutes())
                }
                setShowTime(false)
              }}
            />
          )}
          <MyModal
            title='Aviso'
            visible={agendado}
          >
            <Text style={s.descriptionIA}>Seu estudo foi agendado com sucesso. Receberá uma notificação.</Text>
            <Button
              title='Fechar'
              onClick={() => setAgendado(false)}
              icon={IconX}
              style={{backgroundColor: colors.red.base}}
            />
          </MyModal>
        </View>
      </View>
    </ScrollView>
  )
}
