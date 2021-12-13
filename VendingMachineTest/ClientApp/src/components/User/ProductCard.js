import React, { Component } from 'react';
import classes from './ProductCard.module.css';

export class ProductCard extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
    };
  }

  render() {
    const { data, isFetching, error } = this.state;
    if (isFetching) {
      return <div>...Loading</div>;
    }

    if (error) return <div>{`Error: ${error.message}`}</div>;

    return (
      <div className={classes.container}>
        <img className={classes.size} src={data.imageSrc} alt="..." />
        <div className={classes.description}>
          <div className={classes.title}>{data.title}</div>
          <div>Total count: {data.quantity}</div>
          <div>Cost: {data.cost}</div>
        </div>
        <div>
          <button
            onClick={() => this.props.onAdd(data)}
            className={classes['select-btn']}
          >
            Select
          </button>
        </div>
      </div>
    );
  }
}
