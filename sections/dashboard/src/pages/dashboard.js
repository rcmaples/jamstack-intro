import React, { useEffect } from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import Profile from "../components/profile";
import RouteSecret from "../components/route-secret";
import RouteBase from "../components/route-base";
import RouteLogin from "../components/route-login";
import { navigate } from "gatsby";

const Dashboard = ({ location }) => {
  // useEffect(() => {
  //   if (location.pathname.matches(/^\/dashboard\/?$/)) {
  //     navigate("/dashboard/login", { replace: true });
  //   }
  // }, []);
  return (
    <Layout>
      <Profile />
      <Router>
        <RouteBase path="/dashboard/base" />
        <RouteSecret path="/dashboard/secret" />
        <RouteLogin path="/dashboard/login" />
      </Router>
    </Layout>
  );
};

export default Dashboard;
