import React, { useState } from 'react';
import van from "./assets/6-11_van_200.png";

function App() {
  const initialUpgradeCost = 5; // first cost to upgrade. The exponential function has this horizontal constant.
  const initialRate = 1; // initial donut holes per click
  const [points, SetPoints] = useState(0); // donut holes
  const [cash, SetCash] = useState(0);
  const [sellPrice, SetSellPrice] = useState(0.5);
  const [rate, SetRate] = useState(initialRate); // donut holes per click
  const rateIncrease = 0.05; // rate increase per each upgrade
  const [upgradeCost, SetUpgradeCost] = useState(initialUpgradeCost); // exponential function of constant initialUpgradeCost and upgradeCount
  const [upgradeCount, SetUpgradeCount] = useState(0); // number of times upgraded
  const [notificationLevel, SetNotificationLevel] = useState(0); // banner value. 0: top banner, 1: van, anything else: nothing
  const [vanCount, SetVanCount] = useState(0); // amount of vans bought
  // const [advertizeCost, SetAdvertizeCost] = useState(sellPrice * 2);
  const carCost = 10000; // cost to buy van

  const Sell = () => {
    if (points > 0) {
      SetCash(cash + (points * sellPrice));
      for (let i = 0; i < points; i++) {
        SetSellPrice(sellPrice * (Math.random() + 0.51))
        if (sellPrice <= 0.05) {
          SetSellPrice(0.05);
        }
        if (sellPrice >= 5) {
          SetSellPrice(5);
        }
      }
      SetPoints(0);
      // if (sellPrice <= 1) {

      //   SetAdvertizeCost(sellPrice * 2);
      // }
      // else {
      //   SetAdvertizeCost(sellPrice ** 2);
      // }
    }
  }

  const UpgradeRate = () => {
    if (cash >= upgradeCost) {
      SetCash(cash - upgradeCost);
      SetRate(rateIncrease * (upgradeCount) + initialRate); // FOR LESS THAN 10,000
      // SetRate(0.9 * (upgradeCount - 10000) + 1000); // for over 10,000 and less than 1,000,000
      
      SetUpgradeCount(upgradeCount + 1);
      SetUpgradeCost(0.00001 *(upgradeCount ** 2) + initialUpgradeCost); // exponential increase
    }
  }
  
  const Upgrade100 = () => {
    if (cash >= upgradeCost * 100) {
      SetCash(cash - (upgradeCost * 100));
      for (let i = 0; i < 100; i++) {
        SetRate(rateIncrease * (upgradeCount) + initialRate);
        SetUpgradeCount(upgradeCount + 1);
        SetUpgradeCost(0.00001 *(upgradeCount ** 2) + initialUpgradeCost); // 0.0001x^2 + 2 CONSTANT
      }
    }

  }

  // const Advertize = () => {
  //   if (cash >= advertizeCost) {
  //     SetCash(cash - advertizeCost);
  //     SetSellPrice(sellPrice + 0.05);
  //     if (sellPrice <= 1) {
  //       SetAdvertizeCost(sellPrice * 2);
  //     }
  //     else {
  //       SetAdvertizeCost(sellPrice ** 2);
  //     }
  //   }
  // }

  const BuyVan = () => {
    if (cash >= carCost) {
      SetCash(cash - carCost);
      SetNotificationLevel(1);
      SetVanCount(vanCount + 1);

    }
  }

  function Intro() {
    return (
      <div className="columns is-centered">
        <div className="column box is-5 has-text-centered">
          <div className="button is-small is-pulled-right" onClick={() => SetNotificationLevel(-1)}>X</div>
          <br></br>
          <h2 className="subtitle">I want to buy a van to travel the world... But I'm broke and only know how to bake donut holes!</h2>
          <h2 className="subtitle">My dream van costs ${carCost}.</h2>
          <h2 className="subtitle">I can do it!</h2>
        </div>
      </div>
    );
  }

  function Van() {
    return (
      <div className="columns is-centered">
        <div className="column is-5 has-text-centered">
          {/* <figure className="image">
            <iframe title="van" className="has-ratio" width="192" height="160" src={van} />
          </figure> */}
          <img src={van} alt="van" />
        </div>
      </div>
    );
  }


  function Notification(props) {
    const level = props.notificationLevel;
    if (level === 0) {
      return <Intro />
    }
    else if (level === 1) {
      return <Van />
    }
    else {
      return null;
    }
  }


  function VanCountText() {
    if (vanCount >= 1) {
      return <h3 className="subtitle is-5">vans: {vanCount}</h3>
    }
    else {
      return null;
    }
  }

  return (

    <div className="App">
      <br></br>
      <Notification notificationLevel={notificationLevel} />


      <br></br>
      <div className="columns is-centered">
        <div className="column has-text-centered">
          <h1 className="title is-1">Donut Holes</h1>
        </div>
      </div>


      <br></br>
      <br></br>
      <div className="columns is-centered">
        {/* <div className="column is-9" /> */}
        <div className="column box is-2 has-text-centered">
          <h3 className="subtitle is-5">cash: ${parseFloat(cash).toFixed(2)}</h3>
        </div>
        {/* <div className="column is-1" /> */}
      </div>


      <br></br>
      <div className="columns is-centered">
        <div className="column box is-3 has-text-centered">
          <h3 className="subtitle is-3">Bake</h3>
          <div>
          <h3 className="subtitle is-5">Donut holes: {parseInt(points)}</h3>
          </div>
          <div className="button is-dark is-large" onClick={() => SetPoints(points + (1 * rate))}>Bake</div><br></br>
          {/* <div className="button is-black" onClick={() => SetPoints(points + 1)}>Collect</div><br></br> */}
          <br></br>
          <br></br>
          <div className="button is-warning" onClick={Sell}>Sell all</div><br></br>
          <h3 className="subtitle is-5">sell price: ${parseFloat(sellPrice).toFixed(2)}</h3>

          {/* <div className="button is-gray" onClick={() => SetRate(rate * 1.1)}>level up</div> */}
        </div>

        <div className="column is-1" />




        <div className="column is-3 box has-text-centered">
          <h3 className="subtitle is-3">Upgrade</h3>
          <h3 className="subtitle is-5">Donut holes baked at once: {parseFloat(rate).toFixed(1)}</h3>
          <div className="button is-dark" onClick={UpgradeRate}>Upgrade</div>
          <h3 className="subtitle is-5">cost: ${parseFloat(upgradeCost).toFixed(2)}</h3>
          <div className="button is-dark" onClick={Upgrade100}>Upgrade 100x</div>
          <h3 className="subtitle is-5">cost: ${parseFloat(upgradeCost * 100).toFixed(2)}</h3>
          {/* <div className="button is-warning" onClick={Advertize}>Advertize</div>
          <h3 className="subtitle is-5">cost: ${parseFloat(advertizeCost).toFixed(2)}</h3> */}

        </div>

        <div className="column is-1" />


        <div className="column is-2 has-text-centered">
            <br></br>
            <br></br>
          <div className="columns is-centered">
            <div className="column box">
              <br></br>
              <VanCountText />
              <div className="button is-info" onClick={BuyVan}>Buy Dream Van</div>
              <h3 className="subtitle is-5">cost: ${carCost}</h3>

            </div>
          </div>
          {/* <br></br>
          <br></br> */}
        </div>

        <div className="column is-1" />

      </div>
    </div>
  );
}

export default App;
