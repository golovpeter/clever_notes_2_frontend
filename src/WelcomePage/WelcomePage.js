import React from 'react'
import Header from "../components/Header/Header";
import {Button, Row} from "antd";
import ImageCarousel from "../components/Carousel/Carousel";
import InfCard from "../components/InfCard/InfCard";
import PageFooter from "../components/Footer/Footer";
import 'antd/dist/antd.css';
import './WelcomePage.css'

class WelcomePage extends React.Component {
    render() {
        return (
            <div className="welcome-page">
                <Header buttons={[
                    <Button key="2" href="login" type="primary" shape="round">
                        Sign In
                    </Button>,
                    <Button key="1" href="register" type="primary" shape="round">
                        Sign Up
                    </Button>
                ]}/>
                <Row type="flex" justify="center" align="middle" style={{paddingTop: "50px"}}>
                    <ImageCarousel/>
                </Row>
                <InfCard/>
                <PageFooter/>
            </div>
        );
    }
}

export default WelcomePage