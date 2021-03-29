import React from 'react'
import { RouteChildrenProps } from 'react-router'

interface IParams {
    id: string
}

interface IMprops {

}

function EditMovie(props: RouteChildrenProps<IParams> & IMprops) {
    console.log(props);

    return <h1>编辑电影</h1>
}

export default EditMovie