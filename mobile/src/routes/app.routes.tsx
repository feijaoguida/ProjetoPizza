import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../pages/Dashboard'
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';
import { COLORS } from '../constants';

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    table: number | string;
    order_id: string;
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
    items: ItemProps[];
  }
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}


const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false}} />
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false}} />
      <Stack.Screen name="FinishOrder" component={FinishOrder} options={{
        title: 'Finalizando...',
        headerStyle: {
          backgroundColor: COLORS.dark700
        },
        headerTintColor: COLORS.white
      }} />
    </Stack.Navigator>
  )
}

export default AppRoutes;