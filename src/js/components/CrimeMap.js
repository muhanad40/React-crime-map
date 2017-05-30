import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'

export class CrimeMap extends Component {
	componentWillMount() {
		this.props.fetchCrimes()
	}

    render() {
        return (
        	<div className="js-map">[ MAP ]</div>
        )
    }
}

let mapStateToProps = (state) => {
	return {
		crimes: state.appReducer.crimes
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
        fetchCrimes: () => {
            dispatch(fetchCrimes())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeMap)
