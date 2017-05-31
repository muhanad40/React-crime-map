import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchCrimes } from '../src/js/actions'
import testResponses from './test_responses'
import superagent from 'superagent'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Async actions', () => {
    let store = mockStore({
        appReducer:{
            crimeLocation: {
                lat: 52.629729,
                lng: -1.131592
            }
        }
    })

    beforeEach(() => {
        store.clearActions()
    })

    it('should GET all crimes after 300ms', (done) => {
        let expectedActions = [
                { type: 'FETCH_CRIMES' },
                { type: 'STORE_CRIMES', crimes: testResponses.crimes }
            ],
            mockRequests = superagent.getRequests()

        superagent.setMockResponse('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1', 'GET', testResponses.crimes)

        store.dispatch(fetchCrimes('2016-1'))

        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions)
            expect(mockRequests[0].method).toEqual('GET')
            expect(mockRequests[0].url).toEqual('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1')
            done()
        }, 300)
    })

    it('should fetch list of crimes after 300ms', (done) => {
        let expectedActions = [
                { type: 'FETCH_CRIMES' },
                { type: 'STORE_CRIMES', crimes: testResponses.crimes }
            ],
            mockRequests = superagent.getRequests()

        superagent.setMockResponse('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1', 'GET', testResponses.crimes)

        store.dispatch(fetchCrimes('2016-1'))
        store.dispatch(fetchCrimes('2016-1'))

        setTimeout(() => {
            expect(store.getActions()).toEqual(expectedActions)
            expect(mockRequests[0].method).toEqual('GET')
            expect(mockRequests[0].url).toEqual('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-1')
            done()
        }, 300)
    })
})
