import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useEffect} from 'react';
import DashboardPage from '../features/dashboard/DashboardPage';
import TransactionDetailPage from '../features/transaction/TransactionDetailPage';
import TransactionListPage from '../features/transaction/TransactionListPage';
import {useTrxMethod} from '../shared/provider/TransactionProvider';
import {Transaction} from '../shared/model/Transaction';

export type RootStackParamList = {
  Dashboard: undefined;
  'Transaction List': undefined;
  'Transaction Detail': {transaction: Transaction};
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
          headerShown: false,
        }}>
        <RootStack.Screen
          name="Dashboard"
          component={DashboardPage}
          options={{
            title: 'Home',
            headerShown: true,
          }}
        />
        <RootStack.Screen
          name="Transaction List"
          component={TransactionListPage}
        />
        <RootStack.Screen
          name="Transaction Detail"
          component={TransactionDetailPage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootStackWrapper;
