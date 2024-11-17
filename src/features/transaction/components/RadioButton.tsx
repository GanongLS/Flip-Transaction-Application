import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {appStyles} from '../../../shared/styles/AppStyles';
import {Icon} from '@rneui/base';
import AppColors from '../../../shared/constants/AppColors';

export interface RadioButtonProps {
  isActive: boolean;
  title: string;
  onPress: () => void;
}

const RadioButton = (props: RadioButtonProps) => {
  return (
    <Pressable
      style={{...appStyles.rowStartContainer, margin: 12}}
      onPress={props.onPress}>
      <Icon
        type="ionicon"
        name={
          props.isActive
            ? 'radio-button-on-outline'
            : 'radio-button-off-outline'
        }
        size={24}
        color={AppColors.orange}
        style={{padding: 2, marginRight: 8}}
      />
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default RadioButton;
