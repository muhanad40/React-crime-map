import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { setCrimeDate, fetchCrimes } from '../src/js/actions'
import testResponses from './test_responses'
import superagent from 'superagent'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Synchronous actions', () => {
    it('should create action to store a date', () => {
        let action = setCrimeDate('01-01-2016')

        expect(action).toEqual({
            type: 'SET_CRIME_DATE',
            date: '01-01-2016'
        })
    })
})
