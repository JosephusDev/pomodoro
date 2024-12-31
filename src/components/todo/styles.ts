import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'
import { DEFAULT_STYLE } from '@/constants/styles'

export const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderColor: colors.gray[100],
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: DEFAULT_STYLE.radius,
    shadowColor: colors.gray[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  tarefa: {
    width: 170,
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 15,
    marginBottom: 8
  },
  container_item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  item: {
    color: colors.gray[300],
    fontFamily: fontFamily.regular,
    fontSize: 15,
  },
  trash: {
    marginLeft: 30
  }
})