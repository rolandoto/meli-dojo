import React, { useContext } from 'react';
import { connect } from 'react-redux';
import './Products.styl';

import ProductProvider  from '../../providers/ProductProvider';
import Product from '../Product/Product';

const Products = (props) => {
  let products;
  let isRecommended;
  const { paginator, offset } = useContext(ProductProvider);
  if (props.products.length === 0) {
    isRecommended = true;

  } else {
    isRecommended = false;
    // eslint-disable-next-line prefer-destructuring
    products = props.products;
  }

  const handleAddToCart = product => () => {
    props.addToCart(product);
  };

  return (
    <div className="Products">
      <div className="Products-recommended">
        {isRecommended && <h2>Recomendados</h2> }
      </div>
      <div className="Products-items">
        {products?.map(product => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {!isRecommended && (
        <div className="Products-paginator">
          {offset !== 0 && (
            <button
              onClick={async () => {
                await paginator(false);
                window.scrollTo(0, 0);
              }}
              type="button"
            >
              <i className="fas fa-angle-double-left" />
            </button>
          )}

          <h4>
            {' '}
            {offset + 1}
          </h4>

          <button
            onClick={async () => {
              await paginator(true);
              window.scrollTo(0, 0);
            }}
            type="button"
          >
            <i className="fas fa-angle-double-right" />
          </button>

        </div>
      )}
    </div>
  );
};


export default (Products);
