import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { colors } from '@/styles/colors'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedIcon = () => {
  // Valor compartilhado para a animação
  const strokeDashoffset = useSharedValue(100) // Inicialmente fora da tela

  // Animação nos props do caminho
  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [100, 100], // Define o traço como dividido
    strokeDashoffset: withTiming(strokeDashoffset.value, { duration: 2000 }), // Anima em 2 segundos
  }))

  // Inicia a animação ao montar o componente
  useEffect(() => {
    strokeDashoffset.value = 0 // Finaliza a animação no traço completo
  }, [])

  return (
    <Svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={colors.red.base}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='icon icon-tabler icons-tabler-outline icon-tabler-robot'
    >
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={'none'}
        d='M0 0h24v24H0z' // Caminho SVG do corpo do ícone
      />
      <AnimatedPath
        animatedProps={animatedProps}
        d='M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' // Caminho SVG do corpo do ícone
      />
    </Svg>
  )
}

const IconAnimated = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedIcon />
    </View>
  )
}

export default IconAnimated
