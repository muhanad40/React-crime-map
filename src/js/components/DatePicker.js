import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes, setCrimeDate } from '../actions'

class DatePicker extends React.Component {
	onDateChange = (e) => {
		this.props.dispatch(setCrimeDate(e.target.value))
		this.props.dispatch(fetchCrimes())
	}

	render() {
		return (
			<div>
				<strong>Enter a crime date (YYYY-MM):</strong>

				<input type="text" value={ this.props.crimeDate } onChange={ this.onDateChange }/>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		crimeDate: state.appReducer.crimeDate
	}
}

export default connect(mapStateToProps)(DatePicker)
