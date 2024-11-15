import {View, Text} from 'react-native';
import React from 'react';
import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/RootStack";

const DashboardPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dashboard Page</Text>
      <Button onPress={() => navigation.navigate('Transaction List')}>
        Go to Transaction List
      </Button>
    </View>
  );
};

export default DashboardPage;
