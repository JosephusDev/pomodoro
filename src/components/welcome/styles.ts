import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.gray[100],
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray[200],
    marginTop: 12,
  },
})
