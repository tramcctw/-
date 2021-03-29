import React from 'react'
import { RouteChildrenProps } from 'react-router'
import ImgUploader from '../../components/ImgUploader'

interface IParams {
    id: string
}

interface IMyprops {

}

function EditMovie(props: RouteChildrenProps<IParams> & IMyprops) {
    console.log(props.match.params.id);

    return <ImgUploader></ImgUploader>
}

export default EditMovie