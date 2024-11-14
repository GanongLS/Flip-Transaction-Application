import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

enum RouteName {
  dashboard = 'Dashboard',
  transactionList = 'Transaction List',
  transactionDetail = 'Transacation Detail',
}

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteName.dashboard}
        screenOptions={{
          headerStyle: {backgroundColor: 'salmon'},
        }}>
        <Stack.Screen
          name={RouteName.dashboard}
          component={Dashboard}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name={RouteName.transactionList}
          component={TransactionListPage}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteName.transactionDetail}
          component={TransactionDetailPage}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Dashboard = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dashboard Page</Text>
    </View>
  );
};

const TransactionListPage = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Transaction List Page</Text>
    </View>
  );
};

const TransactionDetailPage = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Transaction Detail Page</Text>
    </View>
  );
};

export default RootStack;
