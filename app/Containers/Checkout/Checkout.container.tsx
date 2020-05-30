import React from 'react';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';

import Checkout from './Checkout.component';
import { CartState } from '../../Reducers/Cart.reducer';
import { CartItem } from '../../Components/ProductItem/ProductItem.component';
import WooCommerce, { config } from '../../Services/WooCommerce';

const CheckoutContainer = (): JSX.Element => {
  const products = useSelector((state: CartState) => state.products || []);
  const total = useSelector((state: CartState) => state.total || 0);

  const handleCheckoutSubmit = async (userInfo: object) => {
    const order = {
      billing: userInfo,
      shipping: userInfo,
      line_items: products.map(({ id, quantity }: CartItem) => ({
        product_id: id,
        quantity
      }))
    };
    const {
      data: { id, order_key }
    } = await WooCommerce.post('/orders', order);

    const paymentUrl =
      `${config.WC_BASE_URL}/checkout/order-pay/${id}` +
      `?pay_for_order=true&key=${order_key}`;

    return Linking.openURL(paymentUrl);
  };

  return (
    <Checkout
      handleCheckoutSubmit={handleCheckoutSubmit}
      products={products}
      total={total}
    />
  );
};

export default CheckoutContainer;
