import { Text, View, TouchableOpacity } from "react-native";
import { s } from "./styles";
import { IconApple, IconCalendar, IconCircleCheck, IconCircleFilled, IconTrash } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface IAgendamento {
    id: number;
    tarefa: string;
    data: Date;
    hora: number;
    minuto: number;
    status: "Concluido" | "Pendente";
    onPressStatus?: () => void;
    onPressDelete?: () => void;
}

interface TodoProps{
    data: IAgendamento;
    onPressStatus?: () => void;
    onPressDelete?: () => void;
    onClick?: () => void;
}

export default function Todo(
    { data, onPressStatus, onPressDelete, onClick }: TodoProps
) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={s.container}>
                <TouchableOpacity onPress={onPressStatus}>
                    {
                        data.status === "Concluido" ? (
                            <IconCircleCheck size={25} color={colors.gray[100]} />
                        ) : 
                        data.status === "Pendente" && (
                            <IconCircleFilled size={25} color={colors.gray[100]} />
                        )
                    }
                </TouchableOpacity>
                <View>
                    <Text style={s.tarefa}>{data.tarefa}</Text>
                    <View style={s.container_item}>
                        <IconCalendar size={20} color={colors.gray[300]}/>
                        <Text style={s.item}>
                            {data.data.toLocaleDateString()} às {String(data.hora).padStart(2, '0')}:{String(data.minuto).padStart(2, '0')}
                        </Text>
                    </View>
                </View>
                <View style={s.trash}>
                    <TouchableOpacity onPress={onPressDelete}>
                        <IconTrash color={colors.red.base}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}
