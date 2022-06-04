import React, { createContext } from 'react';

export const ProductContext = createContext({ products: [] });

class ProductProvider extends React.Component {
  state = {
    offset: 0,
    endPoint: 'https://api.mercadolibre.com/sites/MCO/search?q=',
    products: [],
    query: '',
  };

  getProducts = async (query) => {
    this.setState({ products: [], query, offset: 0 });
    const { endPoint } = this.state;
    const response = await (await fetch(`${endPoint}${query}`)).json();
    const { results } = response;
    this.setState({
      products: results,
    });
  };

  paginator = async (isMore) => {
    const { endPoint, query, offset } = this.state;
    let newOffset;
    isMore ? newOffset = offset + 1 : newOffset = offset - 1;

    const response = await (
      await fetch(`${endPoint}${query}&offset=${newOffset * 50}`)
    ).json();
    const { results } = response;
    console.log(newOffset * 50);
    this.setState({
      products: results,
      offset: newOffset,
    });
  };

  render() {
    const { getProducts } = this;
    const { paginator } = this;
    const { children } = this.props;
    const { products, offset } = this.state;
    return (
      <ProductContext.Provider
        value={{ products, getProducts, paginator, offset }}
      >
        {children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
