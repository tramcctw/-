import React, { useState } from 'react'
import { Input, Form, Button } from 'antd'
import styled from 'styled-components'
import del from '../../assets/delete.svg'

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
    border-left:8px solid #f40;
    border-top:1px dashed #f90;
    border-bottom:1px dashed #f90;
    border-right:1px dashed #f90;
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

export default function Notes() {
    const { TextArea } = Input
    const [showNotes, setShowNotes] = useState<string[]>(['ddd', 'yyy', 'kfh llo', 'xxxxx', 'yyyy', 'kkk', 'ddd', 'sss', 'xxxx'])
    const [noteVal, setNoteVal] = useState<string>('')
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function handleSubmit() {
        let str = noteVal.trim()
        if (str === "") {
            return;
        }
        setNoteVal('')
        setShowNotes([...showNotes, str])
    }

    function handleDelete(index: number) {
        showNotes.splice(index, 1)
        setShowNotes([...showNotes])

    }

    return <>
        <ContentWrapper>
            {
                showNotes.map((item, index) => (<Content key={index}>{item}<Dele onClick={() => { handleDelete(index) }} >x</Dele></Content>))
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