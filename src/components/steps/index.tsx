import { View, Text, TouchableOpacity } from 'react-native'
import { s } from './styles'
import Step from '../step'
import {
  IconClock,
  IconApple,
  IconBackground,
} from '@tabler/icons-react-native'
import { router } from 'expo-router'
import Button from '../button'

export function Steps() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Veja como funciona:</Text>
      <Step
        icon={IconApple}
        title='Concentre-se com o Método Pomodoro'
        description='Descubra a técnica de produtividade que divide seu tempo em ciclos de trabalho focado e pausas revigorantes. Configure a duração de cada sessão e veja sua produtividade aumentar.'
      />
      <Step
        icon={IconBackground}
        title='Funciona Mesmo em Segundo Plano'
        description='Continue focado sem preocupações! Nosso app mantém o cronômetro ativo, mesmo quando você alterna para outras tarefas ou bloqueia a tela.'
      />
      <Step
        icon={IconClock}
        title='Alarmes para Nunca Perder o Ritmo'
        description='Os alarmes garantem que você saiba exatamente quando é hora de trabalhar e quando é hora de descansar. Personalize os sons para torná-los ideais para seu ambiente.'
      />
      <View style={s.containerButton}>
        <Button title='Começar' onClick={() => router.navigate('/home')} />
      </View>
    </View>
  )
}
