import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { addItem } from "../actions/itemActions";
import { addSoldItem } from "../actions/saleActions"
import { moneyFormat } from "../helpers/helpers";
import {
  Button,
  Container,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
  Label,
  Badge
} from "reactstrap";
import store from "../store";

class SaleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      currentPrice: 0,
      currentQuantity: 0,
      soldItem: {
        name: "none",
        _id: "none",
        quantity: 0,
        sellPrice: 0,
        barcode: 0
      }
    };
    this.currentItem = null;
  }

  updateSoldItem = () => {
    setTimeout(
      function () {
        console.log(this.state.currentPrice);
        //Save Desired Fields to the state to be logged in the database for sold items
        this.setState({
          soldItem: {
            name: this.currentItem.name,
            barcode: this.currentItem.barcode,
            _id: this.currentItem._id,
            quantity: this.state.currentQuantity,
            sellPrice: this.state.currentPrice
          }
        });
      }
        .bind(this),
      1000
    );
  }

  updateTotal = () => {
    setTimeout(
      function () {
        let currentTotal = this.currentItem.sellPrice * this.state.currentQuantity
        currentTotal = parseFloat(Math.round(currentTotal * 100) / 100).toFixed(2);
        this.setState({
          currentPrice: currentTotal,
        });
        console.log(this.currentItem);
      }
        .bind(this),
      10
    );

  }

  handleChange = (e) => {
    this.setState({
      currentQuantity: e.target.value
    });
    this.updateTotal();
    this.updateSoldItem();
  };

  increment = () => {
    if (this.state.currentQuantity < this.currentItem.quantity) {
      // we set the state's quantity to a temporary variable and incement
      // this was done to stop a bug from appending a "1" to a manually
      // entered value
      let quantity = parseInt(this.state.currentQuantity);
      quantity++;
      this.setState({
        currentQuantity: quantity
      });
      this.updateTotal();
      this.updateSoldItem();
    }
  };

  decrement = () => {
    if (this.state.currentQuantity > 0) {
      this.setState({
        currentQuantity: this.state.currentQuantity - 1
      });
      this.updateTotal();
      this.updateSoldItem();
    }
  };

  formatResults = (itemQuery) => {
    this.currentItem = itemQuery[0];
    return (
      <div className="sale-container">
        <Row>
          <Col>
            <h2>{this.currentItem.name}</h2>
          </Col>
          <Col>
            <Row>
              <p>Sell Price: {moneyFormat(this.currentItem.sellPrice)}</p>
            </Row>
            <Row>
              <p>Quantity: {this.currentItem.quantity}</p>
            </Row>
            <Row>
              <p>Quantity After Purchase: {this.currentItem.quantity - this.state.currentQuantity}</p>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  logSale = () => {
    //We need to verify that the quantity entered is within reasonable bounds
    if (this.currentItem.quantity >= this.state.currentQuantity && this.state.currentQuantity > -1) {
      this.currentItem.quantity -= this.state.currentQuantity
      this.updateSoldItem();
      console.log("\n\n\n\n" + this.state.soldItem._id);
      this.props.addItem(this.currentItem);
      this.props.addSoldItem(this.state.soldItem);
      this.props.toggle();
    } else {
      alert("Error: Quantity entered was invalid or more than what is in stock.");
    }
  };

  render() {
    const { itemQuery } = this.props.item;

    if (itemQuery != null && itemQuery.length !== 0) {
      const itemsList = this.formatResults(itemQuery);

      return (
        <Provider store={store}>
          <React.Fragment>
            <Container>
              <ModalBody>You entered: {itemsList}</ModalBody>
              <Row>
                <Col md="4" xs="3">
                  <Label>Select Quantity:</Label>
                  <Input
                    value={this.state.currentQuantity}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <Label>Total: </Label><Badge color="secondary">{moneyFormat(this.state.currentPrice)}</Badge>
                </Col>
              </Row>
              <Row>
                <Button color="primary" onClick={this.increment}>
                  Up
                </Button>
                <Button color="danger" onClick={this.decrement}>
                  Down
                </Button>
              </Row>
            </Container>
            <ModalFooter>
              <Button color="primary" onClick={this.logSale}>
                Purchase
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </React.Fragment>
        </Provider>
      );
    }
    return (
      <React.Fragment>
        <ModalBody>We Couldn't Find Anything to Match Your Query.</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>
            Close
          </Button>
        </ModalFooter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  soldItem: state.soldItem
});
// if this.props.query is empty we will not show the ItemSearch page
export default connect(
  mapStateToProps,
  { addItem, addSoldItem }
)(SaleModal);
