import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ShopContainer from '../Containers/Shop/Shop.container';
import CartContainer from '../Containers/Cart/Cart.container';
import DetailContainer from '../Containers/Detail/Detail.container';
import CheckoutContainer from '../Containers/Checkout/Checkout.container';

export const routes = {
  Browse: 'Browse',
  Shop: 'Shop',
  Detail: 'Detail',
  Orders: 'Orders',
  Cart: 'Cart',
  Checkout: 'Checkout'
};

export type NavigationParams = {
  Browse: undefined;
  Shop: undefined;
  Detail: {
    id: number;
  };
  Orders: {
    screen: string;
  };
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Browse = (): JSX.Element => (
  <Stack.Navigator initialRouteName={routes.Shop}>
    <Stack.Screen name={routes.Shop} component={ShopContainer} />
    <Stack.Screen name={routes.Detail} component={DetailContainer} />
  </Stack.Navigator>
);

const Orders = (): JSX.Element => (
  <Stack.Navigator initialRouteName={routes.Cart}>
    <Stack.Screen name={routes.Cart} component={CartContainer} />
    <Stack.Screen name={routes.Checkout} component={CheckoutContainer} />
  </Stack.Navigator>
);

const tabIcons = {
  [routes.Browse]: 'shopping-bag',
  [routes.Orders]: 'shopping-cart'
};

const Navigation = (): JSX.Element => (
  <Tab.Navigator
    screenOptions={({ route }): object => ({
      tabBarIcon: ({
        color,
        size
      }: {
        color: string;
        size: number;
      }): JSX.Element => (
        <Icon
          name={tabIcons[route.name]}
          type="font-awesome-5"
          size={size}
          color={color}
        />
      )
    })}>
    <Tab.Screen name={routes.Browse} component={Browse} />
    <Tab.Screen name={routes.Orders} component={Orders} />
  </Tab.Navigator>
);

export default Navigation;
