import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppColors from '../../../shared/constants/AppColors';
import {Transaction} from '../../../shared/model/Transaction';

export interface TrxCardProps {
  item: Transaction;
}

const TransactionCard = (props: TrxCardProps) => {
  let {item} = props;
  return (
    <View
      style={{
        ...styles.card,
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
          // onSaveDetails(item.movie);
          // navigate('Movie Details');
          // getDetails(item.movie.id);
        }}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <View style={{width: 8, backgroundColor: AppColors.orange}} />
        <View style={{padding: 4}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: AppColors.orange,
            }}>
            {item.account_number ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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

export default TransactionCard;
