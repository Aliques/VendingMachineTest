import React, { Component } from 'react';
import { Basket } from './Basket';
import { ProductList } from './ProductList';
import classes from './UserPage.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class UserPage extends Component {
  constructor(props) {
    super();
    toast.configure();
    this.state = {
      productData: [],
      deposit: 0,
      cartItems: props.cartItems ?? [],
      isFetching: true,
      error: null,
    };
  }
  componentDidMount() {
    fetch('https://localhost:44373/Product')
      .then((resp) => resp.json())
      .then((result) =>
        this.setState({ productData: result, isFetching: false })
      )
      .catch((e) => {
        this.setState({ productData: null, isFetching: false, error: e });
      });
    console.log('123');
  }

  depositChanged = (value) => {
    this.setState({ deposit: value });
  };

  onAdd = (product) => {
    const chnangableProduct = this.state.productData.find(
      (x) => x.guid === product.guid
    );

    if (chnangableProduct.quantity === 0) {
      toast.warning('Product is out of stock!', {
        autoClose: 3000,
        position: 'top-right',
      });
      return;
    }

    let totalCost =
      this.state.cartItems.reduce((a, c) => a + c.cost * c.qty, 0) +
      product.cost;
    if (product.cost > this.state.deposit) {
      toast.warning('Insufficient funds!', {
        autoClose: 3000,
        position: 'top-right',
      });
      return;
    }
    if (totalCost > this.state.deposit) {
      toast.warning('Insufficient funds!', {
        autoClose: 3000,
        position: 'top-right',
      });
      return;
    }

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
    const cloneIndex = this.state.productData.findIndex(
      (obj) => obj.guid === product.guid
    );
    const clone = this.state.productData.slice();
    clone[cloneIndex].quantity -= 1;
    this.setState({ productData: clone });
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
    const cloneIndex = this.state.productData.findIndex(
      (obj) => obj.guid === product.guid
    );
    const clone = this.state.productData.slice();
    clone[cloneIndex].quantity += 1;
    this.setState({ productData: clone });
  };

  render() {
    const { cartItems, isFetching, error } = this.state;
    if (isFetching) {
      return <div>...Loading</div>;
    }

    if (error) return <div>{`Error: ${error.message}`}</div>;
    return (
      <div className={classes.container}>
        <ProductList productData={this.state.productData} onAdd={this.onAdd} />
        <Basket
          depositChanged={this.depositChanged}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          cartItems={cartItems}
        />
      </div>
    );
  }
}
