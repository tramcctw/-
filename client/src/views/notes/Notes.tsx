import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitAppState } from '../../redux'
import { appActions, appMapDispatchProps } from "../../redux/core";
import { RouteComponentProps } from 'react-router'

const FormWrapper = styled.div`
    display:flex;
    position:absolute;
    top:400px;
    width:100%;
    flex-direction:column;
    align-items:center;
`
const TextArea = styled.textarea`
    width:320px;
    height:100px;
    resize:none;
    ::-webkit-scrollbar{
        width:1px;
    }
`

const Wrapper = styled.div`
    display:flex;
    position:relative;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`

const ContentWrapper = styled.ul`
    margin-top:50px;
    max-height:300px;
    width:80%;
    overflow:auto;
    padding:0;
    ::-webkit-scrollbar{
        width:1px;
    }
`

const Content = styled.li`
    position:relative;
    list-style:none;
    padding:10px;
    margin-bottom:20px;
    background-color:#fff;
    box-sizing:border-box;
    :last-child{
        margin-bottom:50px;
    }
`
const Dele = styled.span`
    width:10px;
    height: 10px;
    display:block;
    background-color:#aaa;
    color:#fff;
    display:flex;
    justify-content:center;
    line-height:2px;
    border-radius:50%;
    position:absolute;
    right:3px;
    top:3px;
    padding:3px;
    cursor:pointer;
`

export interface IPropsType extends RouteComponentProps {

}


function mapStateToProps(state: IInitAppState) {
    return {
        data: state.notes.data
    }
}

function Notes(props: IPropsType & ReturnType<typeof mapStateToProps> & typeof appActions) {
    const [noteVal, setNoteVal] = useState<string>('')

    useEffect(() => {
        props.getAllContent()
        return () => { }
        /* eslint-disable */
    }, [])

    function handleSubmit() {
        let str = noteVal.trim()
        if (str === "") {
            return;
        }
        setNoteVal('')
        props.addOriginContent({ content: str })
    }

    function handleDelete(index: number) {
        props.deleteContent({ id: props.data[index]._id })
    }

    return <Wrapper>
        <ContentWrapper>
            {
                props.data.map((item, index) => (<Content key={index}>{item.content}<Dele onClick={() => { handleDelete(index) }} >x</Dele></Content>))
            }
        </ContentWrapper>
        <FormWrapper>
            <TextArea value={noteVal} onChange={(e) => {
                setNoteVal(e.target.value)
            }}></TextArea>
            <Button type="primary" onClick={() => {
                handleSubmit()
            }} style={{ marginLeft: "255px" }}>
                发表
            </Button>
        </FormWrapper>
    </Wrapper>
}

export default connect(mapStateToProps, appMapDispatchProps)(Notes)