import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'
import { DEFAULT_STYLE } from '@/constants/styles'

export const s = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    gap: 20,
    marginTop: 40,
  },
  container: {
    marginTop: 30,
  },
  label: {
    color: colors.gray[100],
    fontFamily: fontFamily.semiBold,
    marginBottom: 5,
    marginTop: 10,
  },
  titleIA: {
    fontFamily: fontFamily.semiBold,
    marginTop: 20,
    marginBottom: 5,
    color: colors.red.base,
  },
  descriptionIA: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  temporizador: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 50,
    fontFamily: fontFamily.medium,
  },
  alerta: {
    marginTop: 50,
    textAlign: 'center',
    color: colors.gray[300],
    fontSize: 20,
    fontFamily: fontFamily.medium,
  },
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
  containerButton: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5,
    marginTop: 15
  },
  InputGroup: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5
  }
})
