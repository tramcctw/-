import React, { useState, useEffect } from 'react'
import { Input, Form, Button } from 'antd'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitAppState } from '../../redux'
import { appActions, appMapDispatchProps } from "../../redux/core";
import { RouteComponentProps } from 'react-router'

const FormWrapper = styled.div`
    position:fixed;
    bottom:50px;
    left:300px;
    width:500px;
`
const ContentWrapper = styled.ul`
    left:300px;
    position:absolute; 
    max-height:400px;
    width:750px;
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
    const { TextArea } = Input
    const [noteVal, setNoteVal] = useState<string>('')

    useEffect(() => {
        props.getAllContent()
        return () => { }
        /* eslint-disable */
    }, [])

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

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

    return <>
        <ContentWrapper>
            {
                props.data.map((item, index) => (<Content key={index}>{item.content}<Dele onClick={() => { handleDelete(index) }} >x</Dele></Content>))
            }
        </ContentWrapper>
        <FormWrapper>
            <TextArea allowClear rows={4} value={noteVal} onChange={(e) => {
                setNoteVal(e.target.value)
            }} maxLength={100}></TextArea>
            <Form.Item {...tailLayout}>
                <Button type="primary" onClick={() => {
                    handleSubmit()
                }} style={{ marginLeft: "270px" }}>
                    发表
                </Button>
            </Form.Item>
        </FormWrapper>
    </>
}

export default connect(mapStateToProps, appMapDispatchProps)(Notes)