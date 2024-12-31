import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'
import { DEFAULT_STYLE } from '@/constants/styles'

export const s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: DEFAULT_STYLE.radius,
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray[100],
    paddingHorizontal: 5,
  },
})
