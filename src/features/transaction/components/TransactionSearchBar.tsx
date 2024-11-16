import {useNavigation} from '@react-navigation/core';

import React, {memo, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';

import {Icon} from '@rneui/base';
import {normalize} from '@rneui/themed';
import {useTrxMethod} from '../../../shared/provider/TransactionProvider';
import AppColors from '../../../shared/constants/AppColors';

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
          name="search-outline"
          size={28}
          color={AppColors.gray82}
          onPress={onIconPress}
          style={{padding: 8}}
        />
        <TextInput
          placeholder="Cari nama, bank, atau nominal"
          placeholderTextColor={AppColors.gray82}
          style={{
            fontSize: 14,
            color: AppColors.gray66,
            flex: 1,
            marginVertical: 16,
          }}
          onChangeText={t => setText(t)}
          value={text}
          onSubmitEditing={onSearch}
        />

        <View style={{...styles.rowEndContainer, flexGrow: 0.1}}>
          <Text
            style={{
              fontSize: 14,
              color: AppColors.orange,
              fontWeight: 700,
              marginVertical: 16,
            }}>
            URUTKAN
          </Text>
          <Icon
            type="ionicon"
            name="chevron-down-outline"
            size={28}
            color={AppColors.orange}
            onPress={() => setText('')}
          />
        </View>
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
  rowEndContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rounded: {
    backgroundColor: AppColors.white,
    borderRadius: 4,
  },
});
