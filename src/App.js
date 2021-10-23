import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//components
import Login from "./Components/Login/Login";
import Auction from "./Components/SuperAdmin/Auction/Auction";
import Home from "./Components/SuperAdmin/Home/Home";
import Subscription from "./Components/SuperAdmin/Subscription/Subscription";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/subscription" component={Subscription} />
        <Route exact path="/auction" component={Auction} />
      </Switch>
    </>
  );
}

export default App;
