import React from 'react';
import { FlatList, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import ProductItem, {
  Product
} from '../../Components/ProductItem/ProductItem.component';

interface Props {
  products: Array<Product>;
  handleProductPress: (id: number) => void;
}

const _renderProduct = (props: Props) => ({
  item
}: {
  item: Product;
}): JSX.Element => <ProductItem {...props} product={item} />;

const _renderEmpty = (): JSX.Element => (
  <Text style={styles.textEmpty}>No available product at the moment</Text>
);

const Shop = (props: Props): JSX.Element => {
  const { products } = props;

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      renderItem={_renderProduct(props)}
      keyExtractor={(item): string => `${item.id}`}
      numColumns={2}
      ListEmptyComponent={_renderEmpty()}
    />
  );
};

interface Styles {
  container: ViewStyle;
  textEmpty: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center'
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 16
  }
});

export default Shop;
