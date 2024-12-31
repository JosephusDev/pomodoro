import React from "react";
import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "@/styles/colors";
import { s } from "./styles";

interface ResumeProps {
  criadas?: number;
  concluidas?: number;
}

export default function Resume({
  criadas = 0,
  concluidas = 0,
}: ResumeProps) {
  return (
    <View>
      <View style={s.container}>
        <View style={s.group}>
          <Text style={s.title}>Criadas</Text>
          <Text style={s.badge}>{criadas}</Text>
        </View>
        <View style={s.group}>
          <Text style={s.title}>Concluídas</Text>
          <Text style={s.badge}>{concluidas}</Text>
        </View>
      </View>
      <View style={s.view_progress}>
        <Slider
          style={s.progress}
          minimumValue={0}
          maximumValue={1}
          value={criadas > 0 ? concluidas / criadas : 0}
          minimumTrackTintColor={colors.red.base}
          maximumTrackTintColor={colors.gray[100]}
          thumbTintColor={colors.red.base}
        />
        <Text style={s.progress_text}>
          {Math.round((concluidas / criadas) * 100)}% concluídas
        </Text>
      </View>
    </View>
  );
}
