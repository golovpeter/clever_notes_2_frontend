import React from "react";
import "./InfCard.css";
import { Card, Col, Row } from "antd";
import { isMobile } from "react-device-detect";

class InfCard extends React.Component {
  render() {
    if (!isMobile) {
      return (
        <>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ paddingTop: "70px", paddingLeft: "250px" }}
          >
            <Col span={12}>
              <Card
                title={
                  <p align="center" style={{ fontSize: "25px" }}>
                    Easy-way to create notes
                  </p>
                }
                style={{ width: "70%" }}
              >
                <p>
                  Simplified design and easy to use make this note service an
                  indispensable helper in everyday life.
                </p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <p align="center" style={{ fontSize: "25px" }}>
                    Have notes everywhere
                  </p>
                }
                style={{ width: "70%" }}
              >
                <p>
                  Cloud - system of notes allows you to use notes from different
                  devices.
                </p>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  }
}

export default InfCard;
