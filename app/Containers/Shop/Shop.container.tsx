import React, { useEffect, useState } from 'react';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Shop from './Shop.component';
import { NavigationParams, routes } from '../../Navigations';
import WooCommerce from '../../Services/WooCommerce';
import { Product } from '../../Components/ProductItem/ProductItem.component';
import { actions } from '../../Reducers/Cart.reducer';

interface Props {
  navigation: StackNavigationProp<NavigationParams>;
}

const ShopContainer = ({ navigation }: Props): JSX.Element => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const dispatch = useDispatch();

  const handlers = {
    handleProductPress: (id: number): void =>
      navigation.navigate('Detail', { id }),
    addToCart: (product: Product): Action => {
      navigation.navigate('Orders', { screen: routes.Cart });

      return dispatch(actions.addToCart(product));
    },
    removeFromCart: (productId: number): Action =>
      dispatch(actions.removeFromCart(productId)),
    addQuantity: (productId: number): Action =>
      dispatch(actions.addQuantity(productId)),
    subQuantity: (productId: number): Action =>
      dispatch(actions.subQuantity(productId))
  };

  useEffect(() => {
    WooCommerce.get('/products').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return <Shop {...handlers} products={products} />;
};

export default ShopContainer;
