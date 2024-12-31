import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { IconProps } from '@tabler/icons-react-native'
import { s } from './styles';
import { colors } from '@/styles/theme';

interface IProps extends ViewProps{
  onPress: () => void;
  icon?: React.ComponentType<IconProps>
}

const FloatingButton = ({ onPress, icon: Icon, style } : IProps) => {
  return (
    <View style={[s.container, style]}>
      <TouchableOpacity style={s.button} onPress={onPress}>
        {Icon && <Icon size={20} color={colors.gray[100]} />}
      </TouchableOpacity>
    </View>
  );
};



export default FloatingButton;
