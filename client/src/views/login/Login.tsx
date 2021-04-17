import React, { useState } from 'react'
import { Input, Form, Button, Checkbox } from 'antd';
import styled from "styled-components";

interface ILoginDes {
    username: string;
    password: string;
    remember: boolean;
}

const LoginWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100vw;
    background-color:#eee;
`

const Content = styled.div``


export default function Login() {

    const [userName, setUserName] = useState<string>("")
    const [userPwd, setUserPwd] = useState<string>("")

    function handleSubmit(value: ILoginDes) {
        console.log(value);
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <LoginWrapper>
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

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </LoginWrapper>
    )
}