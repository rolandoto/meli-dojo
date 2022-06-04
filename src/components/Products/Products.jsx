import React, { useContext } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import './Products.styl';
import Product from './Product';
import useRecommended from '../hooks/useRecommended';
import { ProductContext } from '../providers/ProductProvider';

const Products = (props) => {
  let products;
  let isRecommended;
  const { paginator, offset } = useContext(ProductContext);
  if (props.products.length === 0) {
    products = useRecommended();
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
        {products.map(product => (
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

const mapDispatchToProps = {
  addToCart: actions.addToCart,
};

export default connect(null, mapDispatchToProps)(Products);
