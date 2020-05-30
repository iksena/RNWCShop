import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import { Button, Input } from 'react-native-elements';

import { toAmount } from '../../Utils';
import { CartState } from '../../Reducers/Cart.reducer';
import { CartItem } from '../../Components/ProductItem/ProductItem.component';

interface Props extends CartState {
  handleCheckoutSubmit: (userInfo: object) => void;
}

const _renderForm = ({ handleCheckoutSubmit }: Props): JSX.Element => (
  <Formik
    initialValues={{
      first_name: '',
      last_name: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      email: '',
      phone: ''
    }}
    onSubmit={(values): void => handleCheckoutSubmit(values)}>
    {({ handleChange, handleBlur, handleSubmit, values }): JSX.Element => (
      <>
        <Input
          label="First Name"
          placeholder="James"
          onChangeText={handleChange('first_name')}
          onBlur={handleBlur('first_name')}
          value={values.first_name}
        />
        <Input
          label="Last Name"
          placeholder="Moriarty"
          onChangeText={handleChange('last_name')}
          onBlur={handleBlur('last_name')}
          value={values.last_name}
        />
        <Input
          label="Address 1"
          placeholder="221B Baker Street"
          onChangeText={handleChange('address_1')}
          onBlur={handleBlur('address_1')}
          value={values.address_1}
        />
        <Input
          label="Address 2"
          onChangeText={handleChange('address_2')}
          onBlur={handleBlur('address_2')}
          value={values.address_2}
        />
        <Input
          label="City"
          placeholder="Birmingham"
          onChangeText={handleChange('city')}
          onBlur={handleBlur('city')}
          value={values.city}
        />
        <Input
          label="State"
          placeholder="West Midlands"
          onChangeText={handleChange('state')}
          onBlur={handleBlur('state')}
          value={values.state}
        />
        <Input
          label="Post Code"
          placeholder="NW1 6XE"
          onChangeText={handleChange('postcode')}
          onBlur={handleBlur('postcode')}
          value={values.postcode}
        />
        <Input
          label="Country"
          placeholder="United Kingdom"
          onChangeText={handleChange('country')}
          onBlur={handleBlur('country')}
          value={values.country}
        />
        <Input
          label="Email"
          placeholder="james@gov.uk"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        <Input
          label="Phone"
          placeholder="+628123456789"
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          value={values.phone}
        />
        <Button
          // @ts-ignore
          onPress={handleSubmit}
          title="Proceed to payment"
        />
      </>
    )}
  </Formik>
);

const _renderOrderItem = ({
  id,
  name,
  price,
  quantity
}: CartItem): JSX.Element => (
  <View style={styles.orderItem} key={id}>
    <Text style={{ flex: 0.4 }}>{name}</Text>
    <Text style={{ flex: 0.2 }}>x {quantity}</Text>
    <Text style={{ flex: 0.4, textAlign: 'right' }}>
      {toAmount(price * quantity)}
    </Text>
  </View>
);

const _renderOrders = ({ products }: Props) => products.map(_renderOrderItem);

const _renderCheckout = (props: Props): JSX.Element => (
  <View style={styles.checkoutContainer}>
    <Text style={styles.textHeading}>Your order:</Text>
    {_renderOrders(props)}
    <View style={styles.orderItem}>
      <Text style={styles.textTotal}>Total:</Text>
      <Text style={styles.textTotal}>{toAmount(props.total)}</Text>
    </View>
    <Text style={styles.textHeading}>Billing details:</Text>
    {_renderForm(props)}
  </View>
);

const Checkout = (props: Props): JSX.Element => (
  <ScrollView>
    {props.products.length > 0 ? (
      _renderCheckout(props)
    ) : (
      <Text style={styles.textEmpty}>You have not ordered any item</Text>
    )}
  </ScrollView>
);

interface Styles {
  checkoutContainer: ViewStyle;
  textHeading: TextStyle;
  textEmpty: TextStyle;
  textTotal: TextStyle;
  orderItem: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  checkoutContainer: {
    marginHorizontal: 5
  },
  textHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  orderItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 16
  },
  textTotal: {
    fontWeight: 'bold'
  }
});

export default Checkout;
