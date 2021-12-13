import React, { Component } from 'react';
import classes from './Basket.module.css';
export class Basket extends Component {
  constructor(props) {
    super();
    this.state = {
      cartItems: props.cartItems ?? [],
      totalCost: 0,
    };
  }

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
      <div className={classes.container}>
        <div className={classes.title}>Your choice</div>
        {this.state.cartItems.length === 0 && (
          <div className={classes['empty-dialog']}>Select drinks</div>
        )}
        {this.state.cartItems.map((item) => (
          <div key={item.guid}>
            <div className="col-2">{item.title}</div>
            <div className="col-2">
              <button onClick={() => this.props.onAdd(item)} className="add">
                +
              </button>
              <button
                onClick={() => this.props.onRemove(item)}
                className="remove"
              >
                -
              </button>
              <div className="col-2 text-right">
                {item.qty} x ${item.cost.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
        {this.state.cartItems.length !== 0 && (
          <div>Total cost: {this.state.totalCost}</div>
        )}
      </div>
    );
  }
}
