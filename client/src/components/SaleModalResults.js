import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { editItem } from "../actions/itemActions";
import {
  Button,
  Container,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";
import Item from "./Item";
import store from "../store";

class SaleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      currentQuantity: 0
    };
    this.currentItem = null;
  }

  handleChange = (e) => {
    this.setState({
      currentQuantity: e.target.value
    });
  };

  increment = () => {
    if (this.state.currentQuantity < this.currentItem.quantity) {
      this.setState({
        currentQuantity: this.state.currentQuantity + 1
      });
    }
  };

  decrement = () => {
    if (this.state.currentQuantity > 0) {
      this.setState({
        currentQuantity: this.state.currentQuantity - 1
      });
    }
  };

  formatResults = (itemQuery) => {
    this.currentItem = itemQuery[0];
    return (
      <div className="col-md-3 pb-3" key={itemQuery[0]._id}>
        <Item
          key={itemQuery[0]._id}
          name={itemQuery[0].name}
          quantity={itemQuery[0].quantity}
        />
      </div>
    );
  };

  logSale = () => {
    console.log("enter clicked");
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
