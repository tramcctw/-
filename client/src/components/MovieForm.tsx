import React, { useState } from 'react'
import { Button, Form, Input, Checkbox, Row, Col, InputNumber, Switch } from 'antd'
import ImgUpload from "./ImgUploader"
import styled from "styled-components";
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { appMapDispatchProps, appActions } from '../redux/core'
import { IInitAppState } from '../redux';
import { IMovie } from '../services/interface';


const EditWrapper = styled.div`
    padding-left:100px;
`

interface IAllGroups {
    label: string;
    value: string
}

interface IPropsType {
    editMovie?: IMovie
}

function mapStateToProps(state: IInitAppState) {
    return {
        editMovie: state.movie.editMovie
    };
}

function MovieForm(props: IPropsType & Partial<RouteComponentProps & typeof appActions>) {

    const [imgUrl, setImgUrl] = useState<string>("")
    const [commingChecked, setCommingChecked] = useState<boolean>(false)
    const [classicChecked, setClassicChecked] = useState<boolean>(false)
    const [hotChecked, setHotChecked] = useState<boolean>(false)

    function handleSubmit(values: IMovie) {
        props.saveOriginMovie({ movie: values })
        props.history.push('/movie')
    }

    function handleChange(imgUrl: string) {
        setImgUrl(imgUrl)
    }

    function getCheckBox(key: boolean) {
        let AllTypes: IAllGroups[]
        if (key) {
            AllTypes = [
                {
                    label: '中国大陆',
                    value: '中国大陆'
                },
                {
                    label: '美国',
                    value: '美国'
                },
                {
                    label: "中国香港",
                    value: "中国香港"
                },
                {
                    label: "韩国",
                    value: "韩国"
                }
            ]
        } else {
            AllTypes = [
                {
                    label: '喜剧',
                    value: '喜剧'
                },
                {
                    label: '动作',
                    value: '动作'
                },
                {
                    label: "灾难",
                    value: "灾难"
                },
                {
                    label: "科幻",
                    value: "科幻"
                }
            ]
        }
        return AllTypes.map(item => (
            <Col span={8} key={item.label}>
                <Checkbox value={item.value}>
                    {item.label}
                </Checkbox>
            </Col>
        ))
    }

    return <EditWrapper>
        <Form
            onFinish={handleSubmit}
            style={{ width: "400px" }}
            layout="horizontal"
        >
            <Form.Item
                label="电影名称"
                name="name"
                rules={[{ required: true, message: '请填写电影名称' }]}
            >
                <Input value={ } onChange={ }></Input>
            </Form.Item>
            {/* 内部监听onChange事件 */}
            <Form.Item label="电影封面" name="poster" initialValue={''}>
                <ImgUpload onChange={handleChange} currImg={imgUrl} />
            </Form.Item>
            <Form.Item
                name="areas"
                label="地区"
                rules={[{ required: true, message: "请选择地区" }]}
            >
                <Checkbox.Group>
                    <Row>
                        {getCheckBox(true)}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name="types" label="类型"
                rules={[{ required: true, message: '请选择类型' }]}
            >
                <Checkbox.Group>
                    <Row>
                        {getCheckBox(false)}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name="timeLong"
                label="时长(分钟)"
                rules={[{ required: true, message: '请选择时长' }]}
            >
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item
                name="isHot"
                label="正在热映"
                initialValue={false}
            >
                <Switch checked={hotChecked} onChange={() => { setHotChecked(!hotChecked) }}></Switch>
            </Form.Item>
            <Form.Item
                name="isComming"
                label="即将上映"
                initialValue={false}
            >
                <Switch checked={commingChecked} onChange={() => { setCommingChecked(!commingChecked) }}></Switch>
            </Form.Item>
            <Form.Item
                name="isClassic"
                label="经典影片"
                initialValue={false}
            >
                <Switch checked={classicChecked} onChange={() => { setClassicChecked(!classicChecked) }}></Switch>
            </Form.Item>
            <Form.Item
                name="description"
                label="描述"
                initialValue={''}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                wrapperCol={{ offset: 4 }}
            >
                <Button htmlType="submit" type="primary">提交</Button>
            </Form.Item>
        </Form>
    </EditWrapper>

}

export default connect(mapStateToProps, appMapDispatchProps)(withRouter(MovieForm))