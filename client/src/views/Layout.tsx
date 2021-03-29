import React from "react";
import styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import Home from "./Home";
import AddMovie from "./movie/AddMovie";
import EditMovie from "./movie/EditMovie";
import MovieList from "./movie/MovieList";
import { Layout, Menu } from "antd";

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
`;

const _Layout = () => {
  return (
    <Wrapper>
      <Layout>
        <Header>
          <HeaderTitle>
            <NavLink to="/">
              <HeaderTitle>猫眼电影管理系统</HeaderTitle>
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
              <Menu.Item key="1">
                <NavLink to="/movie">电影列表</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/movie/add">添加电影</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/movie/add">添加电影</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to="/movie/add">添加电影</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ overflow: "auto" }}>
            <ContentMes>
              <Route path="/" component={Home} exact></Route>
              <Route path="/movie" component={MovieList} exact></Route>
              <Route path="/movie/add" component={AddMovie}></Route>
              <Route path="/movie/edit/:id" component={EditMovie}></Route>
            </ContentMes>
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default _Layout;
