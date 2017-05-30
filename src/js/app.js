require("babel-polyfill")

import CrimeMap from './components/CrimeMap'
import DatePicker from './components/DatePicker'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

render(
    <Provider store={store}>
        <div className="row">
            <div className="column">
                <DatePicker />

                <CrimeMap />
            </div>
        </div>
    </Provider>,
    document.querySelector('.js-crime-map')
)
