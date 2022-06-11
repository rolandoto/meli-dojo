import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';

import  ProductProvider from '../../providers/ProductProvider';
import Products from '../Products/Products';
import "./Search.styl";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const { products, getProducts } = useContext(ProductProvider);

  const handleChange = (event, updaterFunction) => {
    const { value } = event.target;
    updaterFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (search !== "") {
      getProducts(search);
    }
  };
  return (
    <div className="Search">
      <form className="Search-bar" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="input-text"
          type="text"
          name="input"
          placeholder="Buscar"
          value={search}
          onChange={(event) => handleChange(event, setSearch)}
        />
        <button type="submit" className="Search-button">
          <i className="icon fa fa-search" />
        </button>
      </form>
      <div className="Search-products">
        <Products products={products} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(Search);
