import { Modal, Text, View } from 'react-native'
import { s } from './styles'
import React from 'react'

interface IModalProps {
  visible: boolean
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function MyModal({
  visible,
  title,
  subtitle,
  children,
}: IModalProps) {
  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View style={s.centeredView}>
        <View style={s.modalView}>
          <Text style={s.modalTitle}>{title}</Text>
          {
            subtitle && (
              <Text style={s.modalSubtitle}>{subtitle}</Text>
            )
          }
          {children}
        </View>
      </View>
    </Modal>
  )
}
