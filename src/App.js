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
import UserDetails from "./Components/SuperAdmin/UserDetails/UserDetails";
import Reward from "./Components/SuperAdmin/Reward/Reward";
import FreeAuction from "./Components/SuperAdmin/Reward/FreeAuction";
import ExclusiveAuction from "./Components/SuperAdmin/Reward/ExclusiveAuction";
import RedeemPoints from "./Components/SuperAdmin/Reward/RedeemPoints";

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
        <ProtectedRoute exact path="/user-details" component={UserDetails} />
        <ProtectedRoute exact path="/reward" component={Reward} />
        <ProtectedRoute exact path="/free-aution" component={FreeAuction} />
        <ProtectedRoute exact path="/exclusive-aution" component={ExclusiveAuction} />
        <ProtectedRoute exact path="/redem-points" component={RedeemPoints} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
