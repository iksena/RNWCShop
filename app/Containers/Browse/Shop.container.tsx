import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import Shop from './Shop.component';
import { routes } from '../../Navigations';

const ShopContainer = (props: object): JSX.Element => {
  const navigation = useNavigation();

  const handlers = {
    handleProductPress: (id: number): void =>
      navigation.navigate(routes.Detail, { id })
  };

  useEffect(() => {}, []);

  return <Shop {...props} {...handlers} />;
};

export default ShopContainer;
