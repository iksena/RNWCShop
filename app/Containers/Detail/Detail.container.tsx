import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

import DetailComponent from './Detail.component';
import { Product } from '../../Components/ProductItem/ProductItem.component';
import WooCommerce from '../../Services/WooCommerce';
import { NavigationParams } from '../../Navigations';

const DetailContainer = (): JSX.Element => {
  const initialProduct = {
    id: 1,
    name: '',
    price: 0,
    description: '',
    average_rating: '',
    images: []
  };
  const [product, setProduct] = useState<Product>(initialProduct);
  const [imagesShown, showImages] = useState(false);
  const route = useRoute<RouteProp<NavigationParams, 'Detail'>>();

  const handlers = {
    handleShowImages: (): void => showImages((prevState: boolean) => !prevState)
  };

  useEffect(() => {
    WooCommerce.get(`/products/${route.params.id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [route.params.id]);

  return (
    <DetailComponent
      {...handlers}
      imagesShown={imagesShown}
      product={product}
    />
  );
};

export default DetailContainer;
