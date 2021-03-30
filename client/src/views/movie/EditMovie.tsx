import React from 'react'
import { RouteChildrenProps } from 'react-router'

interface IParams {
    id: string
}

interface IMyprops {

}

function EditMovie(props: RouteChildrenProps<IParams> & IMyprops) {

    return <h1>hello</h1>
}

export default EditMovie