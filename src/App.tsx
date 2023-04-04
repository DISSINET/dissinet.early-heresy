import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "./components/layout/Layout";
import "leaflet/dist/leaflet.css";
import "./dissinet.css";

function App() {
  return (
    <Container fluid>
      <Layout />
    </Container>
  );
}

export default App;
