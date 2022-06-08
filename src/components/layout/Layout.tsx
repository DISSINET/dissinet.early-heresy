import * as React from "react";
import MapComponent from "./../map/Map";
import PanelComponent from "./../panel/Panel";
import MentionBox from "./../MentionBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout: React.FC = ({}) => {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Row>
        <Col
          xs="12"
          sm="9"
          style={{
            padding: 0,
            height: "100%",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <MentionBox />
          <MapComponent />
        </Col>
        <Col
          sm="3"
          xs="12"
          style={{
            background: "#fff",
            padding: 0,
            height: "100%",
            position: "absolute",
            right: 0,
          }}
        >
          <PanelComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
