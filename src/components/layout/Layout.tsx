import * as React from "react";
import MapComponent from "./../map/Map";
import PanelComponent from "./../panel/Panel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout: React.FC = ({}) => {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Row>
        <Col xs="12" sm="9" style={{ padding: 0, height: "100%" }}>
          <MapComponent
          //handleMapMoved={store.mapMoved.bind(store)}
          />
        </Col>
        <Col
          sm="3"
          s="12"
          style={{
            height: "100%",
            background: "#fff",
            padding: 0,
          }}
        >
          <PanelComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
