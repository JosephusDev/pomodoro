import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";


export const s = StyleSheet.create({
    container: {
      position: 'absolute',
      right: 20,
    },
    button: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.red.base,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });