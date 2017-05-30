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

describe('Async actions', () => {
    let store = mockStore({
        appReducer:{
            crimeLocation: {
                lat: 52.629729,
                lng: -1.131592
            },
            crimeDate: '2016-1'
        }
    })

    it('should create action to GET all crimes', () => {
        let expectedActions = [
                { type: 'FETCH_CRIMES' },
                { type: 'STORE_CRIMES', crimes: testResponses.crimes }
            ],
            mockRequests = superagent.getRequests()

        superagent.setMockResponse('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1', 'GET', testResponses.crimes)

        store.dispatch(fetchCrimes())

        expect(store.getActions()).toEqual(expectedActions)
        expect(mockRequests[0].method).toEqual('GET')
        expect(mockRequests[0].url).toEqual('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1')
    })
})
