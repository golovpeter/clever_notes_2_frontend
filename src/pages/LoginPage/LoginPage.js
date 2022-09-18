import React from "react";
import Header from "../../components/Header/Header";
import { Button, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import PageFooter from "../../components/Footer/Footer";
import "./LoginPage.css";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCode: undefined,
            handleMessage: undefined,
            showError: false,
        };

        if (localStorage.getItem("access_token") !== null) {
            window.location.href = "/notes";
        }
    }

    signIn(values) {
        fetch("http://localhost:8080/sign-in", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.errorCode === "1") {
                    this.setState({
                        errorCode: response.errorCode,
                        handleMessage: response.errorMessage,
                        showError: true,
                    });
                } else {
                    localStorage.setItem("access_token", response.access_token);
                    localStorage.setItem(
                        "refresh_token",
                        response.refresh_token
                    );
                    window.location.href = "/notes";
                }
            })
            .catch(() => console.error("Failed to fetch, backend id disabled"));
    }

    render() {
        return (
            <>
                <Header />
                <div className="container"></div>
                <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    style={{ minHeight: "80vh" }}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.signIn.bind(this)}
                    >
                        <p style={{ paddingLeft: "85px", marginBottom: "0px" }}>
                            Sign in to
                        </p>
                        <p style={{ paddingLeft: "55px" }}>Clever Notes 2.0</p>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        {this.state.showError ? (
                            <p
                                className={
                                    this.state.errorCode === "1"
                                        ? "errorMessage"
                                        : "successMessage"
                                }
                            >
                                {this.state.handleMessage}
                            </p>
                        ) : null}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                            Or
                            <Link to="/register">
                                <span> register now!</span>
                            </Link>
                        </Form.Item>
                    </Form>
                </Row>
                <PageFooter />
            </>
        );
    }
}

export default LoginPage;
