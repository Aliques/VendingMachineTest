import React, { useState, useEffect } from 'react';
import './CoinsManager.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CoinsManager(props) {
  toast.configure();

  const [coinsData, setCoinsData] = useState([]);
  const [oneTotalCount, setOneTotalCount] = useState(0);
  const [twoTotalCount, setTwoTotalCount] = useState(0);
  const [fiveTotalCount, setFiveTotalCount] = useState(0);
  const [tenTotalCount, setTenTotalCount] = useState(0);
  const [oneStatus, setOneStatus] = useState(false);
  const [twoStatus, setTwoStatus] = useState(false);
  const [fiveStatus, setFiveStatus] = useState(false);
  const [tenStatus, setTenStatus] = useState(false);

  const initRefs = (data) => {
    let a = data[0].isBlocked;
    setOneTotalCount(data[0].totalCount);
    setTwoTotalCount(data[1].totalCount);
    setFiveTotalCount(data[2].totalCount);
    setTenTotalCount(data[3].totalCount);
    setOneStatus(a);
    setTwoStatus(data[1].isBlocked);
    setFiveStatus(data[2].isBlocked);
    setTenStatus(data[3].isBlocked);
  };

  const getCoinStates = () => {
    fetch('Coins')
      .then((resp) => resp.json())
      .then((result) => {
        setCoinsData(result.sort((prev, next) => prev.value - next.value));
        initRefs(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCoinStates();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const coins = [
      {
        value: 1,
        totalCount: oneTotalCount,
        isBlocked: oneStatus,
      },
      {
        value: 2,
        totalCount: twoTotalCount,
        isBlocked: twoStatus,
      },
      {
        value: 5,
        totalCount: fiveTotalCount,
        isBlocked: fiveStatus,
      },
      {
        value: 10,
        totalCount: tenTotalCount,
        isBlocked: tenStatus,
      },
    ];
    fetch('Coins', {
      method: 'PUT',
      body: JSON.stringify(coins),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((o) => {
      getCoinStates();
      toast.success(`Item is saved! `, {
        autoClose: 3000,
        position: 'top-right',
      });
    });
  };

  const onStatusChange = (e) => {
    const { name } = e.target;
    switch (name) {
      case 'refOneStatus':
        setOneStatus(!oneStatus);
        break;
      case 'refTwoStatus':
        setTwoStatus(!twoStatus);
        break;
      case 'refFiveStatus':
        setFiveStatus(!fiveStatus);
        break;
      case 'refTenStatus':
        setTenStatus(!tenStatus);
        break;
      default:
        break;
    }
  };

  return coinsData.length > 0 ? (
    <div className="coin-states__container">
      <label>Coin states</label>
      <form action="" autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="common-container">
          <div className="coin-state-description">
            <div>Type</div>
            <div>Value</div>
            <div>Is blocked</div>
          </div>
          <div className="coin-container">
            <label>1</label>
            <div>
              <input
                type="number"
                name="refOneTotalCount"
                onChange={(e) => {
                  setOneTotalCount(e.target.valueAsNumber);
                }}
                value={oneTotalCount}
                className="common-control-styles"
              />
              <input
                checked={oneStatus}
                name="refOneStatus"
                onChange={onStatusChange}
                type="checkbox"
                className="common-control-styles"
              />
            </div>
          </div>
          <div className="coin-container">
            <label>2</label>
            <div>
              <input
                name="refTwoTotalCount"
                value={twoTotalCount}
                onChange={(e) => {
                  setTwoTotalCount(e.target.valueAsNumber);
                }}
                type="number"
                className="common-control-styles"
              />
              <input
                name="refTwoStatus"
                checked={twoStatus}
                onChange={onStatusChange}
                type="checkbox"
                className="common-control-styles"
              />
            </div>
          </div>
          <div className="coin-container">
            <label>5</label>
            <div>
              <input
                name="refFiveTotalCount"
                value={fiveTotalCount}
                onChange={(e) => {
                  setFiveTotalCount(e.target.valueAsNumber);
                }}
                type="number"
                className="common-control-styles"
              />
              <input
                name="refFiveStatus"
                type="checkbox"
                onChange={onStatusChange}
                checked={fiveStatus}
              />
            </div>
          </div>
          <div className="coin-container">
            <label>10</label>
            <div>
              <input
                name="refTenTotalCount"
                type="number"
                onChange={(e) => {
                  setTenTotalCount(e.target.valueAsNumber);
                }}
                value={tenTotalCount}
                className="common-control-styles"
              />
              <input
                name="refTenStatus"
                type="checkbox"
                onChange={onStatusChange}
                checked={tenStatus}
              />
            </div>
          </div>
        </div>
        <button className="submit common-control-styles">Save</button>
      </form>
    </div>
  ) : (
    <></>
  );
}
