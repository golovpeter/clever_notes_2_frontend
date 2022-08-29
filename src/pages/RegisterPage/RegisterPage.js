import React from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Row} from "antd";
import Header from "../../components/Header/Header";
import PageFooter from "../../components/Footer/Footer";
import './RegisterPage.css'


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCode: undefined,
            handleMessage: undefined,
            showError: false
        };
        this.formRef = React.createRef();
    }

    signUp(values) {
        fetch("/sign-up", {
            method: "POST",
            body: JSON.stringify({"username": values.username, "password": values.password})
        }).then(response => response.json())
            .then(response => {
                if (response.errorCode === "1") {
                    this.setState({
                        errorCode: response.errorCode,
                        handleMessage: response.errorMessage,
                        showError: true
                    });
                } else if (response.errorCode === "0") {
                    this.setState({
                        errorCode: response.errorCode,
                        handleMessage: response.message,
                        showError: true
                    });
                }
            })
    }

    onReset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <>
                <Header buttons={[
                    <Button key="2" href="login" type="primary" shape="round">
                        Sign In
                    </Button>
                ]}/>
                <div className="container">
                </div>
                <Row type="flex" justify="center" align="middle" style={{minHeight: '80vh'}}>
                    <Form

                        name="normal_login"
                        className="register-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.signUp.bind(this)}
                        ref={this.formRef}
                    >
                        <p style={{marginLeft: "40px"}}>Join Clever Notes 2.0</p>
                        <Form.Item className="username-input"
                                   name="username"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!',
                                           min: 5,

                                       },
                                   ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                                   allowClear/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                    min: 8,
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                    min: 8
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords don\'t match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Confirm password"
                            />
                        </Form.Item>
                        {this.state.showError ?
                            <p className={this.state.errorCode === "1" ? "errorMessage" : "successMessage"}>
                                {this.state.handleMessage}
                            </p> : null}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: "100%"}}
                                    onClick={this.state.errorCode === "0" ? this.onReset() : undefined}>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
                <PageFooter/>
            </>
        )
    }
}

export default RegisterPage
