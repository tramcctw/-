import React, { useEffect } from 'react'
import { RouteChildrenProps } from 'react-router'
import MovieForm from '../../components/MovieForm'
import { connect } from 'react-redux'
import { appActions, appMapDispatchProps } from '../../redux/core'
import { IInitAppState } from '../../redux'
import { IMovie } from '../../services/interface'

interface IParams {
    id: string
}

interface IMyprops {
    editMovie: IMovie
}

function mapStateToProps(state: IInitAppState) {
    return {
        editMovie: state.movie.editMovie
    };
}

function EditMovie(props: RouteChildrenProps<IParams> & IMyprops & typeof appActions) {

    useEffect(() => {
        props.getSingleMovie({ id: props.match.params.id })
        return () => { }
    })

    return <MovieForm />
}

export default connect(mapStateToProps, appMapDispatchProps)(EditMovie)