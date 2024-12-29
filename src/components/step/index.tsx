import { View, Text } from 'react-native'
import { s } from './styles'
import { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

interface StepProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export default function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View style={s.container}>
      <Icon size={32} color={colors.red.base} style={s.icon} />
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}
