import React, { useState, useEffect } from 'react'
import { Input, Form, Button } from 'antd';
import styled from "styled-components";
import { connect } from "react-redux"
import { appActions, appMapDispatchProps } from '../../redux/core'
import { IInitAppState } from '../../redux';
import { ILoginState } from '../../redux/login/slice';
import { RouteComponentProps } from 'react-router';
import logo from '../../assets/logo.jpg'

const LoginWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
`

const Content = styled.div`
    margin-left:-80px;
`

const Title = styled.h1`
    color:#008c8c;
    margin-bottom:50px;
`

const Logo = styled.img`
    width: 200px;
    height:150px;
    margin-bottom:50px;
`

interface ILoginDes {
    username: string;
    password: string;
    remember: boolean;
}

interface IPropsType extends RouteComponentProps {

}

function mapStateToProps(state: IInitAppState) {
    return {
        isLogin: state.login.isLogin
    }
}

function Login(props: IPropsType & ILoginState & typeof appActions) {

    const [userName, setUserName] = useState<string>("")
    const [userPwd, setUserPwd] = useState<string>("")

    useEffect(() => {
        sessionStorage.isLogin = false
        if (props.isLogin) {
            props.history.push('/layout')
            sessionStorage.isLogin = true
        }
        return () => {
            props.changeLoginState({ isLogin: false })
        }
        /* eslint-disable */
    }, [props.isLogin])


    function handleSubmit(value: ILoginDes) {
        props.login(value)
    }

    function handleRegister() {
        props.history.push('/register')
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <>
            <LoginWrapper>
                <Title>欢迎来到电影管理系统</Title>
                <Logo src={logo} />
                <Content>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="请输入用户名"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder="请输入密码"
                                value={userPwd}
                                onChange={(e) => {
                                    setUserPwd(e.target.value)
                                }}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Button type="primary" onClick={handleRegister} style={{ marginLeft: "45px" }}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </LoginWrapper>
        </>
    )
}

export default connect(mapStateToProps, appMapDispatchProps)(Login)
