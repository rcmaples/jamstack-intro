import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

const Index = () => {
  return (
    <Layout>
      <h1>This App rules</h1>
      <p>Login to find out why.</p>
      <Link to="/dashboard">Go to the dashboard</Link>
    </Layout>
  );
};

export default Index;
