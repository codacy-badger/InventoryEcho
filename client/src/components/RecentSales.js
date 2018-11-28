import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getSoldItems, deleteAllItems } from "../actions/saleActions";
import PropTypes from "prop-types";
import { moneyFormat } from "./../helpers/helpers";

class RecentSales extends Component {

  componentDidMount() {
    this.props.getSoldItems();
  };

  deleteAllItems = () => {
    this.props.deleteAllItems();
  }

  render() {
    const { items } = this.props.soldItem;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup>
            <Button onClick={this.deleteAllItems}>Clear All Sold Items</Button>
            {items.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <h2>{item.name}</h2>
                  <p>Quantity Sold: {item.quantity}, Price: {moneyFormat(item.sellPrice)}</p>
                  <p>barcode: {item.barcode}</p>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

RecentSales.propTypes = {
  getSoldItems: PropTypes.func.isRequired,
  deleteAllItems: PropTypes.func.isRequired,
  soldItem: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  soldItem: state.soldItem
});

export default connect(
  mapStateToProps,
  { getSoldItems, deleteAllItems }
)(RecentSales);
