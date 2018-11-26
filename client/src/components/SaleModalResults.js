import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { editItem } from "../actions/itemActions";
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
      currentQuantity: 0
    };
    this.currentItem = null;
  }

  updateTotal = () => {
    setTimeout(
      function () {
        this.setState({
          currentPrice: this.currentItem.sellPrice * this.state.currentQuantity
        });
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
    }
  };

  decrement = () => {
    if (this.state.currentQuantity > 0) {
      this.setState({
        currentQuantity: this.state.currentQuantity - 1
      });
      this.updateTotal();
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
      this.props.editItem(this.currentItem);
      this.props.toggle();
    } else {
      alert("Error: Quantity entered was invalid or more than what is in stock.");
    }
  };

  render() {
    console.log(this.props);
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
  item: state.item
});
// if this.props.query is empty we will not show the ItemSearch page
export default connect(
  mapStateToProps,
  { editItem }
)(SaleModal);
