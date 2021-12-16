import React, { Component } from 'react';
import classes from './ProductCard.module.css';

export class ProductCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    if (this.props.isFetching) {
      return <div>...Loading</div>;
    }

    return (
      <div
        className={classes.container}
        onClick={() => this.props.onAdd(this.props.data)}
      >
        <img
          className={classes.size}
          src={this.props.data.imageSrc}
          alt="..."
        />
        <div className={classes.description}>
          <div className={classes.title}>{this.props.data.title}</div>
          <div>Total count: {this.props.data.quantity}</div>
          <div>Cost: {this.props.data.cost}</div>
        </div>
      </div>
    );
  }
}
