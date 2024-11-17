import {useNavigation} from '@react-navigation/core';
import React, {memo, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Icon} from '@rneui/base';
import AppColors from '../../../shared/constants/AppColors';
import {
  SortKind,
  useTrxMethod,
  useTrxState,
} from '../../../shared/provider/TransactionProvider';

export interface SearchBarProps {
  onSorting: () => void;
}

const TransactionSearchBar = memo((props: SearchBarProps) => {
  const {onSorting} = props;
  const {onSearchTrx, onSortTrx} = useTrxMethod();
  const {activeSort} = useTrxState();
  const [text, setText] = useState('');
  const onSearch = () => {
    onSearchTrx(text);
  };

  return (
    <View style={{padding: 8, flex: 1}}>
      <View style={{...styles.rowSBContainer, ...styles.rounded}}>
        <Icon
          type="ionicon"
          name="search-outline"
          size={28}
          color={AppColors.gray82}
          onPress={() => {
            onSearch();
          }}
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

        <Pressable
          style={{...styles.rowEndContainer, flexGrow: 0.1}}
          onPress={() => {
            onSorting();
          }}>
          <Text
            style={{
              fontSize: 14,
              color: AppColors.orange,
              fontWeight: 700,
              marginVertical: 16,
            }}>
            {activeSort}
          </Text>
          <Icon
            type="ionicon"
            name="chevron-down-outline"
            size={28}
            color={AppColors.orange}
            onPress={() => {
              onSorting();
            }}
          />
        </Pressable>
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
