import React, { Component } from 'react';
import { Basket } from './Basket';
import { ProductList } from './ProductList';
import classes from './UserPage.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class UserPage extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    toast.configure();
    this.state = {
      depositCoinsData: { one: 0, two: 0, five: 0, ten: 0 },
      coinsData: [],
      productDataImmutable: [],
      productData: [],
      deposit: 0,
      cartItems: props.cartItems ?? [],
      isFetching: true,
      error: null,
    };
  }
  calculateTotalCost = () => {
    let total = this.state.cartItems.reduce((a, c) => a + c.cost * c.qty, 0);
    this.setState({
      totalCost: total,
    });
  };
  updateCoinsData = (value) => {
    this.setState({ coinsData: value });
  };

  updateDepositCoins = (value, type = 'increment') => {
    switch (value) {
      case 1:
        this.setState((prev) => {
          prev.depositCoinsData.one += type === 'increment' ? 1 : -1;
          return { depositCoinsData: prev.depositCoinsData };
        });
        break;
      case 2:
        this.setState((prev) => {
          prev.depositCoinsData.two += type === 'increment' ? 1 : -1;
          return { depositCoinsData: prev.depositCoinsData };
        });
        break;
      case 5:
        this.setState((prev) => {
          prev.depositCoinsData.five += type === 'increment' ? 1 : -1;
          return { depositCoinsData: prev.depositCoinsData };
        });
        break;
      case 10:
        this.setState((prev) => {
          prev.depositCoinsData.ten += type === 'increment' ? 1 : -1;
          return { depositCoinsData: prev.depositCoinsData };
        });
        break;
      default:
        break;
    }
  };

  getProducts = () => {
    fetch('Product')
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          productData: result,
          productDataImmutable: JSON.parse(JSON.stringify(result)),
          isFetching: false,
        });
      })
      .catch((e) => {
        this.setState({ productData: null, isFetching: false, error: e });
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getProducts();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  toPay = async () => {
    const changedProducts = this.getModifiedProducts(
      this.state.productData,
      this.state.productDataImmutable
    );

    let resp = await fetch('Product/quantity', {
      method: 'PUT',
      body: JSON.stringify(changedProducts),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const totalCost = this.state.cartItems.reduce(
      (a, c) => a + c.cost * c.qty,
      0
    );

    const change = this.state.deposit - totalCost;
    const coins = this.calcPaymentSum(change);

    fetch('Coins/deposit/', {
      method: 'PUT',
      body: JSON.stringify(
        this.state.coinsData.map((x) => {
          return {
            Guid: x.guid,
            Value: (function () {
              switch (x.value) {
                case 1:
                  return coins.one;
                case 2:
                  return coins.two;
                case 5:
                  return coins.five;
                case 10:
                  return coins.ten;
                default:
                  return 0;
              }
            })(),
          };
        })
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.depositChanged(0);
    this.setState({ cartItems: [], deposit: 0 });

    toast.success(`Your change is ${change} ¥`, {
      autoClose: 5000,
      position: 'top-right',
    });
    return resp.status;
  };

  // вычитаем сдачу из внесенного депозита
  calcPaymentSum = (change) => {
    const coins = Object.assign({}, this.state.depositCoinsData);
    function countAll(count, val) {
      for (let index = 0; index < count; index++) {
        switch (val) {
          case 10:
            coins.ten -= 1;
            break;
          case 5:
            coins.five -= 1;
            break;
          case 2:
            coins.two -= 1;
            break;
          case 1:
            coins.one -= 1;
            break;
          default:
            break;
        }
      }
    }
    if (change / 10 >= 1) {
      const dec = Math.trunc(change / 10);
      change -= dec * 10;
      countAll(dec, 10);
    }
    if (change / 5 >= 1) {
      const fif = Math.trunc(change / 5);
      change -= fif * 5;
      countAll(fif, 5);
    }
    if (change / 2 >= 1) {
      const tw = Math.trunc(change / 2);
      change -= tw * 2;
      countAll(tw, 2);
    }
    if (change > 0) {
      countAll(change, 1);
    }
    return coins;
  };

  // получение продуктов с измененным количеством.
  // mut - измененный массив, immut - эталонный массив
  getModifiedProducts = (mut, immut) => {
    return mut.filter((x) =>
      immut.some((o) => o.quantity !== x.quantity && o.guid === x.guid)
    );
  };

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
    this.calculateTotalCost();
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
    this.calculateTotalCost();
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
          updateDepositCoins={this.updateDepositCoins}
          updateCoinsData={this.updateCoinsData}
          depositedCoinsChanged={this.depositedCoinsChanged}
          toPay={this.toPay}
          depositChanged={this.depositChanged}
          onAdd={this.onAdd}
          deposit={this.state.deposit}
          onRemove={this.onRemove}
          cartItems={cartItems}
        />
      </div>
    );
  }
}
