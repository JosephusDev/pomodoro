import { ActivityIndicator, View } from 'react-native'
import { s } from './styles'
import { colors } from '@/styles/theme'
import { StatusBar } from 'expo-status-bar'

export function Loading() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar backgroundColor={'#FFFFFF'} style='dark' />
			<ActivityIndicator size={'large'} style={s.container} color={colors.red.base} />
		</View>
	)
}
