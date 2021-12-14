import React, { Component } from 'react';
import { ProductCard } from './ProductCard';
import classes from './ProductList.module.css';

export class ProductList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.productData,
      recordForEdit: null,
    };
  }

  getProducts = () => {
    this.props.getProducts();
  };

  showRecordDetails = (data) => {
    this.setState({ recordForEdit: data });
  };
  onAdd = (data) => {
    this.props.onAdd(data);
  };
  changeProductList = (cardItems) => {
    this.setState({ productData: this.props.productData });
  };

  render() {
    const { data, isFetching, error } = this.state;
    if (isFetching) {
      return <div>...Loading</div>;
    }

    if (error) return <div>{`Error: ${error.message}`}</div>;
    return (
      <div className={classes.container}>
        {data.map((product) => (
          <ProductCard
            getProducts={this.getProducts}
            key={product.title}
            data={product}
            onAdd={this.onAdd}
            recordForEdit={this.state.recordForEdit}
          />
        ))}
      </div>
    );
  }
}
