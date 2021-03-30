import React, { useState } from 'react'
import ImgUploader from '../components/ImgUploader'

export default function Home() {

    const [imgUrl, setImgUrl] = useState<string>("")

    function handleChange(imgUrl: string) {
        setImgUrl(imgUrl)
    }
    return <ImgUploader currImg={imgUrl} onChange={handleChange}></ImgUploader>
}