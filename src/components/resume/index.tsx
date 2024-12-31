import { Text, View } from "react-native";
import { s } from "./styles";

interface ResumeProps{
    criadas?: number;
    concluidas?: number;
}

export default function Resume({
    criadas = 0,
    concluidas = 0
} : ResumeProps){
    return (
        <View>
            <View style={s.container}>
                    <View style={s.group}>
                        <Text style={s.title}>Criadas</Text>
                        <Text style={s.badge}>{criadas}</Text>
                    </View>
                    <View style={s.group}>
                        <Text style={s.title}>Concluidas</Text>
                        <Text style={s.badge}>{concluidas}</Text>
                    </View>
            </View>
            <View style={s.line}/>
        </View>
    )
}