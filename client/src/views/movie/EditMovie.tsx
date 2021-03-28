import React from 'react'
import { RouteChildrenProps } from 'react-router'

interface IParams {
    id:string
}

interface IMprops{

}

function  EditMovie(props:RouteChildrenProps<IParams> & IMprops ) {
    console.log(props);
    
    return <h1>EditMovie</h1>
}

export default EditMovie