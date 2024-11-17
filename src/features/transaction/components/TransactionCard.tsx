import {Icon} from '@rneui/base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppColors from '../../../shared/constants/AppColors';
import {toTitleCase} from '../../../shared/helpers/StringConverter';
import {Status, Transaction} from '../../../shared/model/Transaction';
import {appStyles} from '../../../shared/styles/AppStyles';
import {nominalFormatter} from '../../../shared/helpers/NominalFormatter';

export interface TrxCardProps {
  item: Transaction;
}

const TransactionCard = (props: TrxCardProps) => {
  let {item} = props;
  let {status} = item;
  let isSuccess = status == Status.Success ? true : false;

  const date = new Date(item.created_at);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString(undefined, options);
  const bankTextConverter = (str: String): String => {
    return str.length > 4 ? toTitleCase(str) : str.toLocaleUpperCase();
  };
  let senderBank: String = bankTextConverter(item.sender_bank);
  let beneficiaryBank: String = bankTextConverter(item.beneficiary_bank);

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
        <View
          style={{
            width: 8,
            backgroundColor: isSuccess ? AppColors.green : AppColors.orange,
          }}
        />
        <View
          style={{
            flexGrow: 1,
            ...appStyles.rowSBContainer,
            padding: 16,
          }}>
          <View>
            <View
              // Sender Bank -> Beneficiary Bank
              style={{...appStyles.rowStartContainer, marginVertical: 2}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: AppColors.black,
                }}>
                {senderBank ?? ''}
              </Text>
              <Icon
                type="ionicon"
                name="arrow-forward-outline"
                size={16}
                color={AppColors.black}
                style={{padding: 2}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: AppColors.black,
                }}>
                {beneficiaryBank ?? ''}
              </Text>
            </View>

            <View
              style={{marginVertical: 2}}
              // Beneficiary name
            >
              <Text
                style={{
                  fontSize: 14,
                  color: AppColors.black,
                }}>
                {item.beneficiary_name.toUpperCase() ?? ''}
              </Text>
            </View>

            <View
              // Nominal . Date
              style={{...appStyles.rowStartContainer, marginVertical: 2}}>
              <Text
                style={{
                  fontSize: 14,
                  color: AppColors.black,
                }}>
                {item.amount ? nominalFormatter(item.amount) : ''}
              </Text>

              <Icon
                type="ionicon"
                name="ellipse"
                size={8}
                color={AppColors.black}
                style={{padding: 4}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: AppColors.black,
                }}>
                {formattedDate ?? ''}
              </Text>
            </View>
          </View>
          {item.status == Status.Success ? (
            <StatusBerhasil />
          ) : (
            <StatusPengecekan />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const StatusPengecekan = () => {
  return (
    <View
      style={{
        ...styles.statusContainer,
        borderColor: AppColors.orange,
        borderStyle: 'solid',
        borderWidth: 1,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: AppColors.black,
        }}>
        Pengecekan
      </Text>
    </View>
  );
};

const StatusBerhasil = () => {
  return (
    <View
      style={{
        ...styles.statusContainer,
        backgroundColor: AppColors.green,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: AppColors.white,
        }}>
        Berhasil
      </Text>
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
  statusContainer: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default TransactionCard;
