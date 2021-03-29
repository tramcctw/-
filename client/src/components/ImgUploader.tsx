import React from 'react'
import { Upload } from 'antd'
import Icon from '@ant-design/icons'

function ImgUploader(props) {
    return <Upload
        action="/api/upload"
        name="fileImg"
        className="avatar-uploader"
    >
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    </Upload>
}

export default ImgUploader