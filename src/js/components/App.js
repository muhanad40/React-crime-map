import React from 'react'
import { connect } from 'react-redux'
import CrimeMap from './CrimeMap'
import DateInput from './DateInput'

class App extends React.Component {
	render() {
		return (
			<div className="row">
	            <div className="column">
	                <DateInput />

	                <CrimeMap />
	            </div>
	        </div>
	    )
	}
}

export default connect()(App)
