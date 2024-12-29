import { Image, Text, View } from 'react-native'
import { s } from './styles'

interface IWelcomeProps {
  title: string
  subtitle: string
}

export function Welcome({ title, subtitle }: IWelcomeProps) {
  return (
    <View>
      <Image source={require('@/assets/images/pomodoro.png')} style={s.logo} />
      <Text style={s.title}>{title}</Text>
      <Text style={s.subtitle}>{subtitle}</Text>
    </View>
  )
}
