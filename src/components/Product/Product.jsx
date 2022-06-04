import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import getUser from '../hooks/getUsers';

const Product = ({ product, handleAddToCart }) => {

  const userNickname = getUser(product);

  const isFreeShipping = () => {
    let freeShipping;
    product.shipping.free_shipping ? freeShipping = true : freeShipping = false;
    return freeShipping;
  };

  return (
    <div className="Products-item">
      <Link to={`product/${product.id}`}>
        <img src={product.thumbnail} alt={product.thumbnail_id} />
      </Link>
      <div className="Products-item-info">
        <h2>
          {product.title}
          <span>
            <NumberFormat value={product.price} displayType="text" thousandSeparator={true} prefix="$" />
            {isFreeShipping() && (
              <i className="fas fa-truck" />
            )}
          </span>
        </h2>
        <p>
          Seller: &nbsp;
          <span>
            {userNickname}
          </span>
        </p>
      </div>
      <button type="button" onClick={handleAddToCart(product)}>Comprar</button>
    </div>
  );
};

export default Product;
