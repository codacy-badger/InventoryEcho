import React, { Component } from "react";
import { Container } from "reactstrap";
import BarcodeEntry from "./../components/BarcodeEntry"

class SaleView extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>Yahoo welcome to SaleView</h1>
          <BarcodeEntry />
        </Container>
      </React.Fragment>
    );
  }
}

export default SaleView;