import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStack';
import {appStyles} from '../../shared/styles/AppStyles';
import {Icon} from '@rneui/base';
import AppColors from '../../shared/constants/AppColors';
import {width} from '../../shared/constants/AppConstants';
import {toTitleCase} from '../../shared/helpers/StringConverter';
import {Transaction} from '../../shared/model/Transaction';
import {nominalFormatter} from '../../shared/helpers/NominalFormatter';

interface TransactionDetailPageProps
  extends NativeStackScreenProps<RootStackParamList, 'Transaction Detail'> {}

const TransactionDetailPage = (props: TransactionDetailPageProps) => {
  let {
    route: {params},
    navigation,
  } = props;
  let {transaction} = params;

  let onClose = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: AppColors.grayEE,
        marginTop: 44,
      }}>
      <TransactionID transaction={transaction} />
      <DetailTitle transaction={transaction} onClose={onClose} />
      <DetailTransactionDetail transaction={transaction} />
    </View>
  );
};

const TransactionID = (props: {transaction: Transaction}) => {
  return (
    <View
      style={{
        ...appStyles.rowStartContainer,
        ...styles.container,
        borderBottomWidth: 0.3,
        borderStyle: 'solid',
        borderBottomColor: AppColors.grayDD,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
        }}>{`ID TRANSAKSI: #${props.transaction.id}`}</Text>
      <Icon
        type="material"
        name="content-copy"
        size={20}
        color={AppColors.orange}
        style={{padding: 4}}
      />
    </View>
  );
};

const DetailTitle = (props: {
  transaction: Transaction;
  onClose: () => void;
}) => {
  return (
    <View
      style={{
        ...appStyles.rowSBContainer,
        ...styles.container,
        borderBottomWidth: 0.7,
        borderStyle: 'solid',
        borderBottomColor: AppColors.grayBD,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
        }}>
        DETAIL TRANSAKSI
      </Text>
      <Pressable
        style={{...appStyles.rowStartContainer, margin: 8}}
        onPress={props.onClose}>
        <Text
          style={{
            fontSize: 16,
            color: AppColors.orange,
            fontWeight: 400,
          }}>
          Tutup
        </Text>
      </Pressable>
    </View>
  );
};

const DetailTransactionDetail = (props: {transaction: Transaction}) => {
  let {transaction} = props;
  const bankTextConverter = (str: String): String => {
    return str.length > 4 ? toTitleCase(str) : str.toLocaleUpperCase();
  };

  let senderBank: String = bankTextConverter(transaction.sender_bank);
  let beneficiaryBank: String = bankTextConverter(transaction.beneficiary_bank);

  const date = new Date(transaction.created_at);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString(undefined, options);
  return (
    <View
      style={{
        ...styles.container,
        borderBottomWidth: 0.3,
        borderStyle: 'solid',
        borderBottomColor: AppColors.grayDD,
      }}>
      <View
        // Sender Bank -> Beneficiary Bank
        style={{...appStyles.rowStartContainer, marginVertical: 8}}>
        <Text
          style={{
            fontSize: 18,
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
            fontSize: 16,
            fontWeight: 'bold',
            color: AppColors.black,
          }}>
          {beneficiaryBank ?? ''}
        </Text>
      </View>
      <View
        // Nama Penerima dan Nominal
        style={{
          ...appStyles.rowStartContainer,
          marginVertical: 12,
          width: width,
        }}>
        <View style={{flex: 0.6}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AppColors.black,
              marginBottom: 4,
            }}>
            {transaction.beneficiary_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: AppColors.black,
            }}>
            {transaction.account_number}
          </Text>
        </View>
        <View style={{flex: 0.4}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AppColors.black,
              marginBottom: 4,
            }}>
            NOMINAL
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: AppColors.black,
            }}>
            {nominalFormatter(transaction.amount)}
          </Text>
        </View>
      </View>
      <View
        // Berita Transafer dan Kode Unik
        style={{
          ...appStyles.rowStartContainer,
          marginVertical: 12,
          width: width,
        }}>
        <View style={{flex: 0.6}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AppColors.black,
              marginBottom: 4,
            }}>
            BERITA TRANSFER
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: AppColors.black,
            }}>
            {transaction.remark}
          </Text>
        </View>
        <View style={{flex: 0.4}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AppColors.black,
              marginBottom: 4,
            }}>
            KODE UNIK
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: AppColors.black,
            }}>
            {transaction.unique_code}
          </Text>
        </View>
      </View>
      <View
        // WAKTU DIBUAT
        style={{
          ...appStyles.rowStartContainer,
          marginVertical: 12,
          width: width,
        }}>
        <View style={{flex: 0.6}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: AppColors.black,
              marginBottom: 4,
            }}>
            WAKTU DIBUAT
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: AppColors.black,
            }}>
            {formattedDate}
          </Text>
        </View>
        <View style={{flex: 0.4}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: width,
    padding: 16,
  },
});

export default TransactionDetailPage;
