import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, Route, RouteComponentProps } from "react-router-dom";
import Home from "./Home";
import AddMovie from "./movie/AddMovie";
import EditMovie from "./movie/EditMovie";
import MovieList from "./movie/MovieList";
import { Layout, Menu, message } from "antd";

const { Header, Sider, Content } = Layout;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ContentMes = styled.div`
  padding: 1em;
`;

const HeaderTitle = styled.h1`
  color: #008c8c;
  font-size: 18px;
  margin-left:-1em;
`;

const _Layout = (props: RouteComponentProps) => {

  useEffect(() => {
    if (sessionStorage.getItem('isLogin') === "false") {
      props.history.push('/')
      message.warn('请登录账号！！')
    }

  }, [])

  return (
    <Wrapper>
      <Layout>
        <Header>
          <HeaderTitle>
            <NavLink to="/">
              <HeaderTitle>我的电影管理系统</HeaderTitle>
            </NavLink>
          </HeaderTitle>
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: "#2a3d55" }}>
            <Menu
              mode="inline"
              theme="dark"
              style={{ backgroundColor: "#2a3d55" }}
            >
              <Menu.Item key="1" className={props.location.pathname === "/layout/movie" && "ant-menu-item-selected"}>
                <NavLink to="/layout/movie">电影列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2" className={props.location.pathname === "/layout/movie/add" && "ant-menu-item-selected"}>
                <NavLink to="/layout/movie/add">添加电影</NavLink>
              </Menu.Item>
              <Menu.Item key="3" className={props.location.pathname === "/layout" && "ant-menu-item-selected"}>
                <NavLink to="/layout">记事本</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ overflow: "auto" }}>
            <ContentMes>
              <Route path="/layout" component={Home} exact></Route>
              <Route path="/layout/movie" component={MovieList} exact></Route>
              <Route path="/layout/movie/add" component={AddMovie}></Route>
              <Route path="/layout/movie/edit/:id" component={EditMovie}></Route>
            </ContentMes>
          </Content>
        </Layout>
      </Layout>
    </Wrapper >
  );
};

export default _Layout;
