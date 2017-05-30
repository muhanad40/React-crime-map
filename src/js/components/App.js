import React from 'react'
import { connect } from 'react-redux'
import CrimeMap from './CrimeMap'
import DatePicker from './DatePicker'

class App extends React.Component {
	render() {
		return (
			<div className="row">
	            <div className="column">
	                <DatePicker />

	                <CrimeMap />
	            </div>
	        </div>
	    )
	}
}

export default connect()(App)
