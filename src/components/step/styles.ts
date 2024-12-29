import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray[100],
    marginTop: 14,
  },
  description: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray[200],
    marginTop: 8,
    textAlign: 'justify',
  },
  icon: {
    marginTop: 12,
  },
})
