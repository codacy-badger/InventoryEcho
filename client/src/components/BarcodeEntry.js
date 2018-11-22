import React, { Component } from "react";
import { connect } from "react-redux";
import { sendQuery } from "../actions/itemActions";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader
} from "reactstrap";
import SaleModalResults from "./SaleModalResults";
import SearchDropdown from "./SearchDropdown";

class BarcodeEntry extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      modal: false,
      queryType: "barcode",
      query: 0
    };
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("helo");
      this.sendBarcodeQuery();
    }
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    });
  };

  handleQueryChange = (e) => {
    this.setState({
      queryType: e.target.value
    });
  }

  sendBarcodeQuery = () => {
    let newQuery = null;
    if (this.state.queryType === "barcode") {
      newQuery = {
        barcode: this.state.query
      }
    } else {
      newQuery = {
        name: this.state.query
      }
    }
    this.props.sendQuery(newQuery);
    console.log(newQuery);
    this.toggle();

    this.setState({ query: null });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <SearchDropdown onChange={this.handleQueryChange} />
          </InputGroupAddon>
          <Input
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            placeholder={`Enter ${this.state.queryType} here...`}
          />
        </InputGroup>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Inventory</ModalHeader>
          <SaleModalResults toggle={this.toggle} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.query
});
// if this.props.query is empty we will not show the Search page

export default connect(
  mapStateToProps,
  { sendQuery }
)(BarcodeEntry);
