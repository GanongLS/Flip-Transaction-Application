import React, {useCallback, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  useTrxMethod,
  useTrxState,
} from '../../shared/provider/TransactionProvider';
import AppColors from '../../shared/constants/AppColors.ts';
import {height} from '../../shared/constants/AppConstants.ts';
import TransactionCard from './components/TransactionCard.tsx';
import TransactionSearchBar from './components/TransactionSearchBar.tsx';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const TransactionListPage = () => {
  const {transactions} = useTrxState();
  const {onSearchTrx} = useTrxMethod();

  useFocusEffect(
    useCallback(() => {
      return () => {
        // to unsearch when blur focus page. 
        onSearchTrx('');
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: height * 0.1}}>
        <TransactionSearchBar />
      </View>

      <FlatList
        style={{flexGrow: 0.9}}
        showsVerticalScrollIndicator={false}
        data={transactions}
        renderItem={({item}) => <TransactionCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.grayF4,
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 0.9,
  },
  card: {
    margin: 8,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default TransactionListPage;
