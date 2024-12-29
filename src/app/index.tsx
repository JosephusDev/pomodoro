import { View, Text, ScrollView } from 'react-native'
import { Welcome } from '@/components/welcome'
import { Steps } from '@/components/steps'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/styles/colors'
import { s } from '@/styles/app/index'

export default function Index() {
  return (
    <ScrollView>
      <StatusBar backgroundColor={colors.gray[600]} style='light' />
      <View style={s.container}>
        <Welcome
          title='Boas vindas ao Pomodoro!'
          subtitle='Este App visa ajudar você a planejar e organizar seu tempo de estudos.'
        />
        <Steps />
      </View>
    </ScrollView>
  )
}
