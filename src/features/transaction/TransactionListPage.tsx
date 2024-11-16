import {View, Text} from 'react-native';
import React from 'react';
import {useTrxState} from '../../shared/provider/TransactionProvider';

const TransactionListPage = () => {
  const {transactions} = useTrxState();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {transactions.map((el, id) => {
        return <Text key={el.account_number}> {el.id}</Text>;
      })}
    </View>
  );
};

export default TransactionListPage;
