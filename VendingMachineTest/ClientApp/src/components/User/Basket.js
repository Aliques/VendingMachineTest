import React, { Component } from 'react';
import './Basket.css';
import { Coins } from './Coins';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Basket extends Component {
  constructor(props) {
    super();
    toast.configure();
    this.state = {
      totalCost: 0,
      paymentStatus: 0,
    };
  }
  updateCoinsData = (value) => {
    this.props.updateCoinsData(value);
  };
  updateDepositCoins = (value) => {
    this.props.updateDepositCoins(value);
  };
  depositChanged = (value) => {
    this.props.depositChanged(value);
  };
  calculateTotalCost = () => {
    this.setState({
      totalCost: this.state.cartItems.reduce((a, c) => a + c.cost * c.qty, 0),
    });
  };

  canselAndRefundMoney = () => {
    if (window.confirm('Cancel the purchase and refund the money?')) {
      this.props.clearBasket();
      toast.success(`Success`, {
        autoClose: 5000,
        position: 'top-right',
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ cartItems: nextProps.cartItems }, this.calculateTotalCost);
  }
  render() {
    return (
      <div>
        <div className="basket-container">
          <div className="title">Your choice</div>
          {this.props.cartItems.length === 0 && (
            <div className="empty-dialog">Select drinks</div>
          )}
          {this.props.cartItems.map((item) => (
            <div className="itemContainer" key={item.guid}>
              <div className="item-name">{item.name}</div>
              <div className="item-buttons">
                <button
                  onClick={() => this.props.onAdd(item)}
                  className="item-add__btn"
                >
                  +
                </button>
                <button
                  onClick={() => this.props.onRemove(item)}
                  className="item-remove__btn"
                >
                  -
                </button>
                <div>
                  {item.qty} x ¥{item.cost.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {this.props.cartItems.length !== 0 && (
          <div className="total">Total cost: {this.state.totalCost} ¥</div>
        )}
        {this.props.cartItems.length !== 0 && (
          <div className="payment-btn-container">
            <button
              onClick={() => {
                this.props.toPay();
              }}
            >
              To pay
            </button>
          </div>
        )}
        <Coins
          updateDepositCoins={this.updateDepositCoins}
          updateCoinsData={this.updateCoinsData}
          coinData={this.props.coinData}
          deposit={this.props.deposit}
          depositChanged={this.depositChanged}
        />
        {this.props.deposit > 0 && (
          <div className="cansel-btn__container">
            <button
              className="common-control-styles cansel-btn"
              onClick={this.canselAndRefundMoney}
            >
              Cancel and refund the money
            </button>
          </div>
        )}
      </div>
    );
  }
}
