import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Cart from './Cart.component';
import { routes } from '../../Navigations';

const CartContainer = (props: object): JSX.Element => {
  const navigation = useNavigation();

  const handlers = {
    handleProductPress: (id: number): void =>
      navigation.navigate(routes.Detail, { id }),
    handleCheckoutPress: (): void => navigation.navigate(routes.Checkout)
  };

  return <Cart {...props} {...handlers} />;
};

export default CartContainer;
