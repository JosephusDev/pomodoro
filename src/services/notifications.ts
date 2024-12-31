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
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Pomodoro 🚀​',
            body: `​​😀​ Olá! Você agendou estudar ${tema.trim()} às ${hora}:${minuto}. Verifique!`
        },
        trigger: data.setMinutes(data.getMinutes() - 5)
    })
    .then((value)=>{
        console.log(value)
        console.log("Estudo: " + data)
    })
    .catch((error)=>{
        console.log("Erro ao agendar: " + error)
    })
}

export const scheduleRestNotification = async (data: Date) => {
    // Adicionar a tarefa no banco de dados
    const hora = data.getHours().toString().padStart(2, '0')
    const minuto = data.getMinutes().toString().padStart(2, '0')
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Pomodoro 🚀​',
            body: `​​😫​ Olá! Chegou a hora de fazer a pausa agendada para às ${hora}:${minuto}.`
        },
        trigger: data
    })
    .then((value)=>{
        console.log(value)
        console.log("Descanso: " + data)
    })
    .catch((error)=>{
        console.log("Erro ao agendar: " + error)
    })
}
