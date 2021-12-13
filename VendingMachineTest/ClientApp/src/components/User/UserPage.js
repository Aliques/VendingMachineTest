import React, { Component } from 'react';
import { Basket } from './Basket';
import { ProductList } from './ProductList';
import classes from './UserPage.module.css';

export class UserPage extends Component {
  constructor(props) {
    super();
    this.state = {
      cartItems: props.cartItems ?? [],
    };
  }

  onAdd = (product) => {
    const exist = this.state.cartItems.find((x) => x.guid === product.guid);

    if (exist) {
      const changedItems = this.state.cartItems.map((x) =>
        x.guid === product.guid ? { ...exist, qty: exist.qty + 1 } : x
      );
      this.setState({
        cartItems: changedItems,
      });
    } else {
      const createdItem = [...this.state.cartItems, { ...product, qty: 1 }];
      this.setState({
        cartItems: createdItem,
      });
    }
  };

  onRemove = (product) => {
    const exist = this.state.cartItems.find((x) => x.guid === product.guid);

    if (exist.qty === 1) {
      this.setState({
        cartItems: this.state.cartItems.filter((x) => x.guid !== product.guid),
      });
    } else {
      const changedItems = this.state.cartItems.map((x) =>
        x.guid === product.guid ? { ...exist, qty: exist.qty - 1 } : x
      );
      this.setState({
        cartItems: changedItems,
      });
    }
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div className={classes.container}>
        <ProductList onAdd={this.onAdd} />
        <div>{this.state.cartItems.length}</div>
        <Basket
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          cartItems={cartItems}
        />
      </div>
    );
  }
}
