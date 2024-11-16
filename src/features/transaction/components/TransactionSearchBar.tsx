import {useNavigation} from '@react-navigation/core';

import React, {memo, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Icon} from '@rneui/base';
import {normalize} from '@rneui/themed';
import {useTrxMethod} from '../../../shared/provider/TransactionProvider';
import AppColors from "../../../shared/constants/AppColors";

export interface SearchBarProps {
  onIconPress?: (event: GestureResponderEvent) => void;
}

const TransactionSearchBar = memo((props: SearchBarProps) => {
  const {navigate} = useNavigation();
  const {onIconPress} = props;
  const {onSearchTrx} = useTrxMethod();
  const [text, setText] = useState('');
  const onSearch = async () => {
    if (text.length > 2) {
      const search = await onSearchTrx(text);
      // search ? (navigate('Search'), setText('')) : null;
    }
  };
  return (
    <View style={{padding: 8, flex: 1}}>
      <View style={{...styles.rowSBContainer, ...styles.rounded}}>
        <Icon
          type="ionicon"
          name="search"
          size={normalize(20)}
          color={AppColors.white}
          onPress={onIconPress}
          style={{padding: 8}}
        />
        <TextInput
          placeholder="Cari movie..."
          placeholderTextColor="white"
          style={{fontSize: normalize(18), color: 'white', flex: 1}}
          onChangeText={t => setText(t)}
          value={text}
          onSubmitEditing={onSearch}
        />
        {text ? (
          <View style={{flex: 0.15}}>
            <Icon
              type="ionicon"
              name="close-circle"
              size={normalize(22)}
              color={AppColors.white}
              onPress={() => setText('')}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
});

export default TransactionSearchBar;

const styles = StyleSheet.create({
  rowSBContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rounded: {
    backgroundColor: AppColors.gray66,
    borderRadius: 12,
  },
});
