import React, { Component } from 'react';
import { ProductCard } from './ProductCard';
import classes from './ProductList.module.css';

export class ProductList extends Component {
  constructor(props) {
    super();
  }

  onDelete = (guid) => {
    this.props.onDelete(guid);
  };
  getProducts = () => {
    this.props.getProducts();
  };

  onAdd = (data) => {
    this.props.onAdd(data);
  };
  changeProductList = (cardItems) => {
    this.setState({ productData: this.props.productData });
  };

  render() {
    if (this.props.isFetching) {
      return <div>...Loading</div>;
    }

    return (
      <div className={classes.container}>
        {this.props.productData.map((product) => (
          <ProductCard
            isFetching={this.props.isFetching}
            onDelete={this.onDelete}
            getProducts={this.getProducts}
            key={product.guid}
            data={product}
            onAdd={this.onAdd}
          />
        ))}
      </div>
    );
  }
}
