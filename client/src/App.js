import React, { Component } from "react";
import Root from "./components/Root";
import InventoryList from "./components/InventoryList";
import ItemModal from "./components/itemModal";
import InventoryView from "./components/InventoryView";
import SaleView from "./components/SaleView";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path={"/"} component={Root}></Route>
          <Route path={"/inventory"} component={InventoryView}></Route>
          <Route path={"/sale"} component={SaleView}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
