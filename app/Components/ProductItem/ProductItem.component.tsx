import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { Button, Card, Icon, Rating } from 'react-native-elements';
import HTML from 'react-native-render-html';

import { toAmount } from '../../Utils';

const { width: screenWidth } = Dimensions.get('window');

interface Props {
  product: Product;
  handleProductPress: (id: number) => void;
}

export interface Image {
  src: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: Array<Image>;
  description: string;
  average_rating: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface Props {
  product: Product;
  handleProductPress: (id: number) => void;
  isInCart: boolean;
  addToCart?: (product: Product) => void;
  removeFromCart?: (id: number) => void;
  addQuantity?: (id: number) => void;
  subQuantity?: (id: number) => void;
  quantity?: number;
}

const noop = () => {};

const _renderCartDetail = ({
  product,
  quantity = 0,
  subQuantity = noop,
  addQuantity = noop,
  removeFromCart = noop
}: Props): JSX.Element => (
  <>
    <View style={styles.actionView}>
      <Icon
        name="minus"
        type="font-awesome-5"
        onPress={(): void => subQuantity(product.id)}
      />
      <Text>Quantity: {quantity}</Text>
      <Icon
        name="plus"
        type="font-awesome-5"
        onPress={(): void => addQuantity(product.id)}
      />
    </View>
    <Button title="Remove" onPress={(): void => removeFromCart(product.id)} />
  </>
);

const _renderBrowseDetail = ({
  product,
  addToCart = noop
}: Props): JSX.Element => (
  <>
    <HTML
      html={product.description}
      textSelectable
      renderers={{
        p: (_: never, children: Array<string>): JSX.Element => (
          <Text numberOfLines={2}>{children}</Text>
        )
      }}
    />
    <View style={styles.actionView}>
      <Rating
        readonly
        imageSize={14}
        startingValue={Number(product.average_rating)}
        // @ts-ignore
        style={styles.rating}
      />
      <Button
        icon={{
          name: 'cart-plus',
          type: 'font-awesome-5',
          color: 'white',
          size: 16
        }}
        onPress={(): void => addToCart(product)}
      />
    </View>
  </>
);

const ProductItem = (props: Props): JSX.Element => {
  const {
    product: {
      id,
      name,
      images: [image],
      price
    },
    handleProductPress,
    isInCart = false
  } = props;

  return (
    <TouchableOpacity onPress={(): void => handleProductPress(id)}>
      <Card
        title={name}
        // @ts-ignore
        titleNumberOfLines={2}
        image={{ uri: image.src }}
        containerStyle={styles.card}>
        <Text>{toAmount(price)}</Text>
        {isInCart ? _renderCartDetail(props) : _renderBrowseDetail(props)}
      </Card>
    </TouchableOpacity>
  );
};

interface Styles {
  card: ViewStyle;
  actionView: ViewStyle;
  rating: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  card: {
    width: screenWidth / 2 - 20,
    margin: 10
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  rating: {
    paddingVertical: 5
  }
});

export default ProductItem;
