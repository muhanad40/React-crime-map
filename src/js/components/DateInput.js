import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes, setCrimeDate } from '../actions'

class DateInput extends React.Component {
    onDateChange = (e) => {
        this.props.dispatch(fetchCrimes(e.target.value))
    }

    render() {
        let today = new Date(),
            initialDate = `${today.getFullYear()}-${today.getMonth()-1}`

        return (
            <div className="date">
                <strong>Enter a crime date (YYYY-MM):</strong>

                <input type="text" className="date__input" defaultValue={ initialDate } onChange={ this.onDateChange }/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        crimeDate: state.appReducer.crimeDate
    }
}

export default connect(mapStateToProps)(DateInput)
