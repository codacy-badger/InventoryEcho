import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    quantity: 0,
    purchasePrice: 0,
    sellPrice: 0,
    barcode: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = this.state;

    //Use ItemActions.js to add item
    this.props.addItem(newItem);

    //close the modal
    this.toggle();
  };

  render() {
    const itemFields = [
      { name: "Name", id: "name" },
      { name: "Quantity", id: "quantity" },
      { name: "Purchase Price", id: "purchasePrice" },
      { name: "Sell Price", id: "sellPrice" },
      { name: "Barcode", id: "barcode" },
    ]
    return (
      <div>
        <Button
          className="add-btn"
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Inventory</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {itemFields.map((item) =>
                  <React.Fragment>
                    <Label for={item.id}>{item.name}</Label>
                    <Input
                      type="text"
                      name={item.id}
                      id={item.id}
                      placeholder={`Add ${item.name} Here...`}
                      onChange={this.onChange}
                    />
                  </React.Fragment>
                )}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Publish
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
