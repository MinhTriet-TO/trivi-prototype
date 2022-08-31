import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

import Form from "./Form";
import Signin from "./Signin";
import ImportAPI from "./ImportAPI";
import ImportFile from "./ImportFile";
import ListItems from "./ListItems";
import DeleteItems from "./DeleteItems";
import Configuration from "./Configuration";
import Documentation from "./Documentation";
import Analytics from "./Analytics";
import Recommend from "./Recommend";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import DashboardOverview from "./DashboardOverview";
import ForgotPassword from "./ForgotPassword";
import ImportHistory from "./ImportHistory";
import SynchronizeGA from "./SynchronizeGA";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Upgrade from "./Upgrade";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signup from "./examples/Signup";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import Profile from "./Profile";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const login = localStorage.getItem('token') ? true : false;



  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  console.log(login)
  return (
    <Route
      {...rest}
      render={(props) =>
        login && rest.path === Routes.Signin.path ? (
          <Redirect to={Routes.DashboardOverview.path} />
        ) : (
          <>
            {" "}
            <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
            
          </>
        )
      }
    />
  );
};
const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const login = localStorage.getItem('token') ? true : false;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        login ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />

            <main className="content">
              <Navbar />
              <Component {...props} />
              <Footer
                toggleSettings={toggleSettings}
                showSettings={showSettings}
              />
            </main>
          </>
        ) : (
          <Redirect to={Routes.Signin.path} />
        )
      }
    />
  );
};





export default () => (

  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />
    <RouteWithSidebar
      exact
      path={Routes.Presentation.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      key="product"
      path={Routes.Product.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="customers"
      path={Routes.Customer.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="customer-profile"
      path={Routes.CustomerProfile.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="session"
      path={Routes.Session.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="transaction"
      path={Routes.Transaction.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="transaction-item"
      path={Routes.TransactionItem.path}
      component={ListItems}
    />
    {/*
    <RouteWithSidebar
      exact
      key="event"
      path={Routes.Events.path}
      component={ListItems}
    />
    <RouteWithSidebar
      exact
      key="article"
      path={Routes.Articles.path}
      component={ListItems}
    /> */}
    <RouteWithSidebar
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithSidebar exact path={Routes.Profile.path} component={Profile} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>

);
