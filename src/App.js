import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//components
import Login from "./Components/Login/Login";
import Auction from "./Components/SuperAdmin/Auction/Auction";
import Home from "./Components/SuperAdmin/Home/Home";
import Subscription from "./Components/SuperAdmin/Subscription/Subscription";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import EmailVerify from "./Components/ForgotPassword/EmailVerify";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import BidPrice from "./Components/SuperAdmin/BidPrice/BidPrice";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/verify-email" component={EmailVerify} />
        <Route exact path="/forgot-password" component={ForgotPassword} />

        {/* protected Ruotes */}
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/subscription" component={Subscription} />
        <ProtectedRoute exact path="/auction" component={Auction} />
        <ProtectedRoute exact path="/bid-price" component={BidPrice} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
