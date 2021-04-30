import React, { useState } from 'react'
import { Button, Form, Input, Checkbox, Row, InputNumber, Switch, message } from 'antd'
import ImgUpload from "./ImgUploader"
import styled from "styled-components";
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { appMapDispatchProps, appActions } from '../redux/core'
import { IInitAppState } from '../redux';
import { IMovie } from '../services/interface';


const EditWrapper = styled.div`
    padding-left:100px;
    padding-top:10px;
`

interface IAllGroups {
    label: string;
    value: string
}

interface IPropsType extends RouteComponentProps {
    editMovie?: IMovie
    onEditChange?: (values: IMovie) => void
}

function mapStateToProps(state: IInitAppState) {
    return {
        // editMovie: state.movie.editMovie
    };
}

function MovieForm(props: IPropsType & Partial<typeof appActions>) {

    const [imgUrl, setImgUrl] = useState<string>("")
    const [commingChecked, setCommingChecked] = useState<boolean>(props.editMovie?.isComming ? props.editMovie.isComming : false)
    const [classicChecked, setClassicChecked] = useState<boolean>(props.editMovie?.isClassic ? props.editMovie.isClassic : false)
    const [hotChecked, setHotChecked] = useState<boolean>(props.editMovie?.isHot ? props.editMovie?.isHot : false)
    const [types, setTypes] = useState<string[]>(props.editMovie?.types ? props.editMovie.types : [])
    const [areas, setAreas] = useState<string[]>(props.editMovie?.areas ? props.editMovie.areas : [])

    function handleSubmit(values: IMovie) {
        if (values.name === "") {
            message.error('请填写电影名字...')
            return
        }
        if (areas.length === 0) {
            message.error('请选择地区...')
            return
        }
        if (types.length === 0) {
            message.error('请选择类型...')
            return
        }

        if (values.timeLong === 0) {
            message.error('请填写时长...')
            return
        }
        values.areas = areas
        values.types = types
        values.poster = imgUrl
        if (props.onEditChange) {
            props.onEditChange(values)
        } else {
            props.saveOriginMovie({ movie: values })
        }
        props.history.push('/layout/movie')
    }

    function handleChange(imgUrl: string) {
        setImgUrl(imgUrl)
    }

    function checkedChange(value: string, checked: boolean) {
        const totalAreas = ['中国大陆', '美国', "香港", "韩国"]
        if (checked) {
            if (totalAreas.includes(value)) {
                setAreas([...areas, value])
            } else {
                setTypes([...types, value])
            }
        } else {
            if (totalAreas.includes(value)) {
                const temp = areas.filter(item => item !== value)
                setAreas(temp)
            } else {
                const temp = types.filter(item => item !== value)
                setTypes(temp)
            }
        }
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
                    label: "香港",
                    value: "香港"
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

            <Checkbox
                key={item.value}
                value={item.value}
                checked={areas.includes(item.value) || types.includes(item.value)}
                onChange={(e) => {
                    checkedChange(item.value, e.target.checked)
                }}
            >
                {item.label}
            </Checkbox>

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
                initialValue={props.editMovie?.name ? props.editMovie.name : ""}
            >
                <Input></Input>
            </Form.Item>
            {/* 内部监听onChange事件 */}
            <Form.Item label="电影封面" name="poster" initialValue={''}>
                <ImgUpload onChange={handleChange} currImg={props.editMovie?.poster ? props.editMovie.poster : imgUrl} />
            </Form.Item>
            <Form.Item
                name="areas"
                label="地区"
                initialValue={[]}
            >
                <Row>
                    {getCheckBox(true)}
                </Row>
            </Form.Item>
            <Form.Item
                name="types"
                label="类型"
                initialValue={[]}
            >
                <Row>
                    {getCheckBox(false)}
                </Row>
            </Form.Item>
            <Form.Item
                name="timeLong"
                label="时长(分钟)"
                initialValue={props.editMovie?.timeLong ? props.editMovie.timeLong : 1}
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
                initialValue={props.editMovie?.description ? props.editMovie.description : ''}
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