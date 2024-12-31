import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'
export const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },    
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
    height: 25,
    marginBottom: 20,
  },
  title: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 16
  },
  badge: {
    backgroundColor: colors.red.base,
    color: colors.gray[100],
    height: 25,
    width: 25,
    borderRadius: 12.5,
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 12,
    fontFamily: fontFamily.bold
  },
  view_progress: { 
    pointerEvents: "none",
    marginBottom: 20
  },
  progress: {
    width: '100%',
  },
  progress_text: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 14,
    marginTop: 5
  }
})
