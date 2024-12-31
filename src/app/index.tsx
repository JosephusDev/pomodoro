import { View, Text, ScrollView } from 'react-native'
import { Welcome } from '@/components/welcome'
import { Steps } from '@/components/steps'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/styles/colors'
import { s } from '@/styles/app/index'
import { getNotificationPermissions } from '@/services/notifications';
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications';

export default function Index() {

  useEffect(() => {
    // Solicitar permissões ao carregar o app
    getNotificationPermissions();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
  }, []);

  return (
    <ScrollView>
      <StatusBar backgroundColor={colors.gray[600]} style='light' />
      <View style={s.container}>
        <Welcome
          title='Bem-vindo ao Pomodoro!'
          subtitle='Este App visa ajudar você a planejar e organizar seu tempo de estudos.'
        />
        <Steps />
      </View>
    </ScrollView>
  )
}
