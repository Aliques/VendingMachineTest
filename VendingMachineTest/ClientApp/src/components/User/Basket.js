import React, { Component } from 'react';
import classes from './Basket.module.css';
import { Coins } from './Coins';
export class Basket extends Component {
  constructor(props) {
    super();
    this.state = {
      cartItems: props.cartItems ?? [],
      totalCost: 0,
    };
  }
  depositChanged = (value) => {
    this.props.depositChanged(value);
  };
  calculateTotalCost = () => {
    this.setState({
      totalCost: this.state.cartItems.reduce((a, c) => a + c.cost * c.qty, 0),
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ cartItems: nextProps.cartItems }, this.calculateTotalCost);
  }

  render() {
    return (
      <div>
        <div className={classes['basket-container']}>
          <div className={classes.title}>Your choice</div>
          {this.state.cartItems.length === 0 && (
            <div className={classes['empty-dialog']}>Select drinks</div>
          )}
          {this.state.cartItems.map((item) => (
            <div className={classes.itemContainer} key={item.guid}>
              <div className={classes['item-name']}>{item.title}</div>
              <div className={classes['item-buttons']}>
                <button
                  onClick={() => this.props.onAdd(item)}
                  className={classes['item-add__btn']}
                >
                  +
                </button>
                <button
                  onClick={() => this.props.onRemove(item)}
                  className={classes['item-remove__btn']}
                >
                  -
                </button>
                <div>
                  {item.qty} x ¥{item.cost.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          {this.state.cartItems.length !== 0 && (
            <div className={classes.total}>
              Total cost: {this.state.totalCost} ¥
            </div>
          )}
          {this.state.cartItems.length !== 0 && (
            <div className={classes['buy-btn']}>
              Total cost: {this.state.totalCost} ¥
            </div>
          )}
        </div>
        <Coins
          deposit={this.state.deposit}
          depositChanged={this.depositChanged}
        />
      </div>
    );
  }
}
