import React, { Component } from "react";
import { Container } from "reactstrap";
import BarcodeEntry from "./../components/BarcodeEntry";
import RecentSales from "./../components/RecentSales";

import { Provider } from "react-redux";
import store from "./../store";

class SaleView extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Container>
            <h1>Yahoo welcome to SaleView</h1>
            <BarcodeEntry />
            <RecentSales />
          </Container>
        </React.Fragment>
      </Provider>
    );
  }
}

export default SaleView;