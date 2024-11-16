import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useTrxState} from '../../shared/provider/TransactionProvider';

import TransactionSearchBar from './components/TransactionSearchBar.tsx';
import AppColors from '../../shared/constants/AppColors.ts';
import {height} from '../../shared/constants/AppConstants.ts';
import TransactionCard from './components/TransactionCard.tsx';

const TransactionListPage = () => {
  const {transactions} = useTrxState();

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
