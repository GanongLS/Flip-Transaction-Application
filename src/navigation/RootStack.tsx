import {View, Text, SafeAreaView} from 'react-native';
import React, {memo, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DashboardPage from '../features/dashboard/DashboardPage';
import TransactionListPage from '../features/transaction/TransactionListPage';
import TransactionDetailPage from '../features/transaction/TransactionDetailPage';
import {useTrxMethod} from '../shared/provider/TransactionProvider';
import AppColors from '../shared/constants/AppColors';

export type RootStackParamList = {
  Dashboard: undefined;
  'Transaction List': undefined;
  'Transaction Detail': undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackWrapper = memo(() => {
  const {fetchTransactions} = useTrxMethod();

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={'Transaction List'}
        screenOptions={{
          headerStyle: {backgroundColor: 'salmon'},
        }}>
        <RootStack.Screen
          name="Dashboard"
          component={DashboardPage}
          options={{title: 'Home'}}
        />
        <RootStack.Screen
          name="Transaction List"
          component={TransactionListPage}
          options={{
            headerStyle: {
              backgroundColor: AppColors.white,
            },
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Transaction Detail"
          component={TransactionDetailPage}
          // options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootStackWrapper;
