import React from 'react'
import styled from 'styled-components'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import AddMovie from './movie/AddMovie'
import EditMovie from './movie/EditMovie'
import MovieList from './movie/MovieList'
import { Layout } from 'antd'

const { Header,Sider,Content } = Layout

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
`

const _Layout = ()=> {
    return (
        <Wrapper>
            <Layout>
                <Header></Header>
                <Layout>
                    <Sider></Sider>
                    <Content>
                        <div>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/movie" component={MovieList} exact></Route>
                            <Route path="/movie/add" component={AddMovie}></Route>
                            <Route path="/movie/edit/:id" component={EditMovie}></Route>
                        </div>
                    </Content>
                </Layout>     
            </Layout>
        </Wrapper>
    )
}

export default _Layout