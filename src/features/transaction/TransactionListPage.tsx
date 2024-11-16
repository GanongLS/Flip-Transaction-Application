import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useTrxState} from '../../shared/provider/TransactionProvider';

import TransactionSearchBar from './components/TransactionSearchBar.tsx';
import AppColors from '../../shared/constants/AppColors.ts';

const TransactionListPage = () => {
  const {transactions} = useTrxState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexGrow: 0.1}}>
        <TransactionSearchBar />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {transactions.map((el, id) => {
            return <Text key={el.account_number}> {el.id}</Text>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 0.9,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default TransactionListPage;
