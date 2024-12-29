import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'
import { DEFAULT_STYLE } from '@/constants/styles'

export const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: colors.gray[100],
    borderRadius: DEFAULT_STYLE.radius,
    padding: 25,
    alignItems: 'center',
    shadowColor: colors.gray[600],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    color: colors.gray[500],
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  modalSubtitle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  modalTime: {
    color: colors.gray[500],
    fontFamily: fontFamily.bold,
    fontSize: 12,
  },
})
