import {View, Text, SafeAreaView} from 'react-native';
import React, { memo } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DashboardPage from '../features/dashboard/DashboardPage';
import TransactionListPage from '../features/transaction/TransactionListPage';
import TransactionDetailPage from '../features/transaction/TransactionDetailPage';
import { useTrxMethod } from "../shared/provider/TransactionProvider";

// enum RouteName {
//   dashboard = 'Dashboard',
//   transactionList = 'Transaction List',
//   transactionDetail = 'Transacation Detail',
// }

export type RootStackParamList = {
  Dashboard: undefined;
  'Transaction List': undefined;
  'Transacation Detail': undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackWrapper = memo(() => {
  const {fetchTransactions} = useTrxMethod();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={'Dashboard'}
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
          // options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Transacation Detail"
          component={TransactionDetailPage}
          // options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootStackWrapper;
