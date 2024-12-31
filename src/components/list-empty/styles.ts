import { StyleSheet } from 'react-native'
import { colors, fontFamily } from '@/styles/theme'
import { DEFAULT_STYLE } from '@/constants/styles'

export const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray[500],
        width: '100%',
        borderRadius: DEFAULT_STYLE.radius,
        padding: 20,
    },
    title:{
        color: colors.gray[100],
        fontFamily: fontFamily.bold,
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
})
