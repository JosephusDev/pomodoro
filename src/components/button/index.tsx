import { TouchableOpacity, Text, View, TouchableOpacityProps } from 'react-native'
import { s } from './styles'
import { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/theme'

interface IButtonProps extends TouchableOpacityProps {
  onClick?: () => void
  title?: string
  icon?: React.ComponentType<IconProps>
  disabled?: boolean
}

export default function Button({ onClick, title, icon: Icon, disabled = false, style }: IButtonProps) {
  return (
    <TouchableOpacity style={[s.button, style]} onPress={onClick} disabled={disabled}>
      <View style={s.container}>
        {Icon && <Icon size={20} color={colors.gray[100]} />}
        {title && <Text style={s.buttonText}>{title}</Text>}
      </View>
    </TouchableOpacity>
  )
}
