import React from "react";
import { Row } from "antd";

const NoMatchPage = () => (
    <>
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ paddingTop: "30vh" }}
        >
            <div className="container">
                <p style={{ fontSize: "40px" }}>404</p>
            </div>
        </Row>
        <Row type="flex" justify="center" align="middle">
            <div className="container">
                <p style={{ fontSize: "40px" }}>Not found</p>
            </div>
        </Row>
    </>
);

export default NoMatchPage;
