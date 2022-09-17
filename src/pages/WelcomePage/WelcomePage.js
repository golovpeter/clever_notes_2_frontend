import React from "react";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ImageCarousel from "../../components/Carousel/Carousel";
import InfCard from "../../components/InfCard/InfCard";
import PageFooter from "../../components/Footer/Footer";
import "antd/dist/antd.min.css";
import "./WelcomePage.css";

class WelcomePage extends React.Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem("access_token") !== null) {
            window.location.href = "/notes";
        }
    }

    render() {
        return (
            <div className="welcome-page">
                <Header
                    buttons={[
                        <Link to="login">
                            <Button key="1" type="primary" shape="round">
                                Sign In
                            </Button>
                        </Link>,
                        <Link to="register">
                            <Button key="2" type="primary" shape="round">
                                Sign Up
                            </Button>
                        </Link>,
                    ]}
                />
                <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    style={{ paddingTop: "50px" }}
                >
                    <ImageCarousel />
                </Row>
                <InfCard />
                <PageFooter />
            </div>
        );
    }
}

export default WelcomePage;
