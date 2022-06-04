import { useState, useEffect, useCallback } from 'react';

const getProduct = (productId) => {
  const [product, setProduct] = useState();

  const url = `https://api.mercadolibre.com/items/${productId}`;

  const fetchProduct = useCallback(async () => {
    const productData = await (
      await fetch(url)
    ).json();
    setProduct(productData);
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return product;
};

export default getProduct;
