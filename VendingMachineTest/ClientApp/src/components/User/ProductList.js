import React, { Component } from 'react';
import { ProductCard } from './ProductCard';
import classes from './ProductList.module.css';

export class ProductList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.productData,
    };
  }

  // componentDidMount() {
  //   fetch('https://localhost:44373/Product')
  //     .then((resp) => resp.json())
  //     .then((result) => this.setState({ data: result, isFetching: false }))
  //     .catch((e) => {
  //       this.setState({ data: null, isFetching: false, error: e });
  //     });
  // }

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
            key={product.title}
            data={product}
            onAdd={this.props.onAdd}
          />
        ))}
      </div>
    );
  }
}
