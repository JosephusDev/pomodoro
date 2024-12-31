import { Welcome } from '@/components/welcome'
import { Alert, FlatList, ScrollView, Text, View } from 'react-native'
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
import MyModal from '@/components/my-modal'
import Button from '@/components/button'

interface IAgendamento {
  id: number;
  tarefa: string;
  data: Date;
  hora: number;
  minuto: number;
  status: "Concluido" | "Pendente";
}

const data: IAgendamento[] = [
  {
    id: 1,
    tarefa: 'Estudar React Native',
    data: new Date(),
    hora: 12,
    minuto: 0,
    status: 'Pendente',
  },
  {
    id: 2,
    tarefa: 'Fazer exercícios',
    data: new Date(),
    hora: 8,
    minuto: 0,
    status: 'Concluido',
  },
  {
    id: 3,
    tarefa: 'Fazer exercícios',
    data: new Date(),
    hora: 8,
    minuto: 0,
    status: 'Concluido',
  },
]

export default function Home() {

  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([])
  const [visivelModal, setVisivelModal] = useState(false)
  const [aviso, setAviso] = useState("")

  const handleDelete = (id: number) => {
    setVisivelModal(true)
    setAviso("Deseja excluir este agendamento?")
  }

  const handleChangeState = (id: number) => {
    setVisivelModal(true)
    setAviso("Deseja concluir este agendamento?")
  }

  useEffect(() => {
    setAgendamentos(data)
  }, [])

  return (
    <View style={s.main}>
      <StatusBar backgroundColor={colors.gray[600]} style='light' />
      <Welcome
        title='Lista de Tarefas'
        subtitle='Gerencie seus estudos agendados.'
      />
      <Resume criadas={3} concluidas={2}/>
      <View style={s.container}>
        {
          agendamentos.length <= 0 ? (
            <ListEmpty/>
          ) : (
            <FlatList
              data={agendamentos}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => 
                <Todo 
                  data={item} 
                  onPressStatus={()=>{
                    if(item.status === "Pendente"){
                      handleChangeState(item.id)
                    }
                  }} 
                  onPressDelete={()=>handleDelete(item.id)}
                  onClick={()=>router.navigate(`/pomodoro?estudo=${item.tarefa}`)}
                />
              }
              scrollEnabled={true}
              style={s.flatList}
            />
          )
        }
      </View>
      <FloatingButton icon={IconPlus} style={{bottom: 20}} onPress={()=>router.navigate('/create')}/>
      <MyModal
        title='Aviso'
        visible={visivelModal}
        subtitle={aviso}
      >
        <Button
          onClick={()=>{
            setVisivelModal(false)
          }}
          title='Confirmar'
          style={{backgroundColor: colors.red.base}}
        />
      </MyModal>
    </View>
  )
}
