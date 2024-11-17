import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import RadioButton from './RadioButton';
import {width} from '../../../shared/constants/AppConstants';
import AppColors from '../../../shared/constants/AppColors';
import {ModalStyles} from '../../../shared/styles/AppStyles';
import {
  useTrxMethod,
  useTrxState,
} from '../../../shared/provider/TransactionProvider';

export interface TrxSortingProps {
  isVisible: boolean;
  onClose: () => void;
}

const TransactionSortingModal = (props: TrxSortingProps) => {
  let {isVisible, onClose} = props;
  let {sortValues, activeSort} = useTrxState();
  let { onSortTrx } = useTrxMethod();
  console.log(activeSort)

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          //set nilai radio button
        }}>
        <TouchableOpacity
          style={{
            ...ModalStyles.baseView,
            justifyContent: 'flex-start',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
          activeOpacity={1}
          onPressOut={() => {
            onClose();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {sortValues.map(el => {
                return (
                  <RadioButton
                    isActive={el == activeSort}
                    title={el}
                    onPress={() => {
                      onSortTrx(el);
                      onClose();
                    }}
                  />
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.85,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TransactionSortingModal;
