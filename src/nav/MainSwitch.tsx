import React from 'react';

import Settings from '@screens/Settings';
import Trainer from '@screens/Trainer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@screens/Loading';

const Stack = createStackNavigator()

export default () => 
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Trainer" component={Trainer} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  </NavigationContainer>
