import { Text, View } from "react-native";
import { s } from "./styles"
import { IconClipboard, IconClipboardList, IconFile, IconFileInfo, IconList, IconListCheck, IconListDetails } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";


export default function ListEmpty(){
    return (
        <View style={s.container}>
            <IconClipboardList size={30} color={colors.gray[100]}/>
            <Text style={s.title}>Nenhuma tarefa encontrada.</Text>
        </View>
    )
}