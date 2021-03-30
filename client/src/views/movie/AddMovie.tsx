import { useEffect } from 'react'
import MovieForm from '../../components/MovieForm'
import { connect } from "react-redux";
import { appActions, appMapDispatchProps } from "../../redux/core";
import { IInitAppState } from '../../redux';
import { IMovie } from '../../services/interface';

interface IMyprops {
    editMovie: IMovie
}

function mapStateToProps(state: IInitAppState) {
    return {
        editMovie: state.movie.editMovie
    }
}

function AddMovie(props: typeof appActions & IMyprops) {
    useEffect(() => {
        props.setEditMovie({})
        return () => { }
        /* eslint-disable */
    }, [])
    return <MovieForm editMovie={null}></MovieForm>
}

export default connect(mapStateToProps, appMapDispatchProps)(AddMovie)