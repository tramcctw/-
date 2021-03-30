import React, { useState } from "react";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { UploadFile } from "antd/lib/upload/interface";
import { IUploadResponse } from "../services/interface";
import Modal from "antd/lib/modal/Modal";

const Wrapper = styled.div``;

const Img = styled.img`
  width: 90%;

`;

const ImgWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`

interface IImgProps {
    currImg?: string;
    onChange?: (imgUrl: string) => void;
}

function ImgUploader(props: IImgProps) {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);

    // 如果有了封面图片就什么都不显示
    function getImgContent() {
        if (props.currImg) {
            return null;
        } else {
            return (
                <Wrapper>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                </Wrapper>
            );
        }
    }

    // 如果有了封面图片就展示该封面图片
    function fileList(): UploadFile[] {
        if (props.currImg) {
            return [
                {
                    uid: props.currImg,
                    name: props.currImg,
                    url: props.currImg,
                },
            ];
        } else {
            return [];
        }
    }

    /**
     *
     * @param info
     * 控制图片的上传
     */
    async function handleImgUpload(info: any) {
        console.log(info);
        const form = new FormData();
        // 构建表单对象，包含请求信息
        form.append(info.filename, info.file);
        // 构建请求对象
        const request = new Request(info.action, {
            method: "post",
            body: form,
        });

        const res: IUploadResponse = await fetch(request).then((res) => res.json());
        if (res.err) {
            message.error("上传失败....");
        } else {
            props.onChange(res.data);
        }
    }

    function handlePreview(show: boolean) {
        setPreviewVisible(show);
    }

    function handleCancel() {
        setPreviewVisible(false);
    }

    return (
        <>
            <Upload
                action="/api/upload"
                name="fileImg"
                listType="picture-card"
                accept=".jpg,.png,.gif,.webp"
                fileList={fileList()}
                customRequest={handleImgUpload}
                onRemove={() => {
                    props.onChange("");
                }}
                onPreview={() => {
                    handlePreview(true);
                }}
            >
                {getImgContent()}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <ImgWrapper>
                    <Img alt="example" src={props.currImg} />
                </ImgWrapper>
            </Modal>
        </>
    );
}

export default ImgUploader;
