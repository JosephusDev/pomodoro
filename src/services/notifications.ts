import * as Notifications from 'expo-notifications';

export async function getNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Permissão para notificações negada!');
            return;
        }
    }
    console.log('Permissão concedida!');
}
// Agendar notificação local
export const scheduleNotification = async (data: Date, tema: string) => {
// Adicionar a tarefa no banco de dados
    const hora = data.getHours().toString().padStart(2, '0')
    const minuto = data.getMinutes().toString().padStart(2, '0')
    const _data = new Date(data)
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Pomodoro 🚀​',
            body: `​​😀​ Olá! Você agendou estudar ${tema.trim()} às ${hora}:${minuto}. Verifique!`
        },
        trigger: _data.setMinutes(_data.getMinutes() - 5)
    })
    .then((value)=>{
        console.log(value)
        console.log("Notificação de Estudo: " + _data)
    })
    .catch((error)=>{
        console.log("Erro ao agendar: " + error)
    })
}

export const scheduleRestNotification = async (rest_data: Date, end_rest_data: Date) => {
    // Adicionar a tarefa no banco de dados
    const hora = rest_data.getHours().toString().padStart(2, '0')
    const minuto = rest_data.getMinutes().toString().padStart(2, '0')
    const _hora = end_rest_data.getHours().toString().padStart(2, '0')
    const _minuto = end_rest_data.getMinutes().toString().padStart(2, '0')
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Pomodoro 🚀​',
            body: `​​😫​ Olá! Chegou a hora de fazer a pausa agendada para às ${hora}:${minuto} até às ${_hora}:${_minuto}.`
        },
        trigger: rest_data
    })
    .then((value)=>{
        console.log(value)
        console.log(`​​😫​ Olá! Chegou a hora de fazer a pausa agendada para às ${hora}:${minuto} até às ${_hora}:${_minuto}.`)
    })
    .catch((error)=>{
        console.log("Erro ao agendar: " + error)
    })
}
