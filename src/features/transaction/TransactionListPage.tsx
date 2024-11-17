import React, {useCallback, useEffect, useState} from 'react';
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
import TransactionSorting from './components/TransactionSortingModal.tsx';

const TransactionListPage = () => {
  const {transactions} = useTrxState();
  const {onSearchTrx, initSortArray} = useTrxMethod();
  const [popUpVisible, setPopUpVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // to unsearch when blur focus page.
        onSearchTrx('');
      };
    }, []),
  );

  useEffect(() => {
    initSortArray();
    // console.log(`pop up visible: ${popUpVisible}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: height * 0.1}}>
        <TransactionSearchBar
          onSorting={() => {
            setPopUpVisible(true);
          }}
        />
      </View>

      <FlatList
        style={{flexGrow: 0.9}}
        showsVerticalScrollIndicator={false}
        data={transactions}
        renderItem={({item}) => <TransactionCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <TransactionSorting
        isVisible={popUpVisible}
        onClose={() => {
          setPopUpVisible(false);
        }}
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
