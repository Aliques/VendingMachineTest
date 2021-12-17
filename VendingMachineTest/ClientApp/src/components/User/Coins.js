import React, { Component } from 'react';
import classes from './Coins.module.css';
export class Coins extends Component {
  constructor(props) {
    super();
    this.state = {
      // deposit: props.deposit,
      error: null,
      data: null,
      isFetching: false,
      oneIsBlocked: true,
      twoIsBlocked: true,
      fiveIsBlocked: true,
      tenIsBlocked: true,
    };
  }

  depositMoney(value, isBlocked) {
    if (!isBlocked) {
      this.props.depositChanged(this.props.deposit + value);
      this.props.updateDepositCoins(value);
    }
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch('Coins')
      .then((resp) => resp.json())
      .then((result) => {
        this.props.updateCoinsData(result);
        this.setState({
          data: result,
          isFetching: false,
          oneIsBlocked: result.find((x) => x.value === 1.0).isBlocked,
          twoIsBlocked: result.find((x) => x.value === 2.0).isBlocked,
          fiveIsBlocked: result.find((x) => x.value === 5.0).isBlocked,
          tenIsBlocked: result.find((x) => x.value === 10.0).isBlocked,
        });
      })
      .catch((e) => {
        this.setState({ data: null, isFetching: false, error: e });
      });
  }

  render() {
    const { isFetching, error } = this.state;
    if (isFetching) {
      return <div>...Loading</div>;
    }
    if (error) return <div>{`Error: ${error.message}`}</div>;

    return (
      <div>
        <div className={classes.deposit}>Deposit: {this.props.deposit} ¥</div>
        <div className={classes['coin-container']}>
          <div
            onClick={() => this.depositMoney(1, this.state.oneIsBlocked)}
            className={classes[this.state.oneIsBlocked ? 'disable' : 'one']}
          >
            1
          </div>
          <div
            onClick={() => this.depositMoney(2, this.state.twoIsBlocked)}
            className={classes[this.state.twoIsBlocked ? 'disable' : 'two']}
          >
            2
          </div>
          <div
            onClick={() => this.depositMoney(5, this.state.fiveIsBlocked)}
            className={classes[this.state.fiveIsBlocked ? 'disable' : 'five']}
          >
            5
          </div>
          <div
            onClick={() => this.depositMoney(10, this.state.tenIsBlocked)}
            className={classes[this.state.tenIsBlocked ? 'disable' : 'ten']}
          >
            10
          </div>
        </div>
      </div>
    );
  }
}
