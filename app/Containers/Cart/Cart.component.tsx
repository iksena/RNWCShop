import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import ProductItem, {
  CartItem,
  Product
} from '../../Components/ProductItem/ProductItem.component';
import { toAmount } from '../../Utils';

interface Props {
  products: Array<CartItem>;
  total: number;
  handleProductPress: (id: number) => void;
  handleCheckoutPress: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addQuantity: (id: number) => void;
  subQuantity: (id: number) => void;
  resetCart: () => void;
}

const _renderProduct = (props: Props) => ({
  item
}: {
  item: CartItem;
}): JSX.Element => (
  <ProductItem {...props} product={item} isInCart quantity={item.quantity} />
);

const _renderEmpty = (): JSX.Element => (
  <Text style={styles.textEmpty}>There is no item in your cart</Text>
);

const Cart = (props: Props): JSX.Element => {
  const { products, resetCart, total, handleCheckoutPress } = props;

  return (
    <>
      <View style={styles.cartOverview}>
        <View style={styles.leftCartOverview}>
          <Icon
            reverse
            name="trash-alt"
            type="font-awesome-5"
            onPress={resetCart}
          />
          <Text style={styles.textTotal}>{`Total:\n${toAmount(total)}`}</Text>
        </View>
        <Button title="Checkout" onPress={handleCheckoutPress} />
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        data={products}
        renderItem={_renderProduct(props)}
        keyExtractor={(item): string => `${item.id}`}
        numColumns={2}
        ListEmptyComponent={_renderEmpty()}
      />
    </>
  );
};

interface Styles {
  container: ViewStyle;
  cartOverview: ViewStyle;
  leftCartOverview: ViewStyle;
  textTotal: TextStyle;
  textEmpty: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    paddingBottom: 64
  },
  cartOverview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
    backgroundColor: 'white',
    zIndex: 1,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  leftCartOverview: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 16
  }
});

export default Cart;
