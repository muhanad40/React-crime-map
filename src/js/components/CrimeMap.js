import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'
import MarkerClusterer from 'gmaps-marker-clusterer'

export class CrimeMap extends Component {
    bounds = new google.maps.LatLngBounds()
    markerClusterer = null

    componentWillMount() {
        this.props.dispatch(fetchCrimes())
    }

    componentDidMount() {
        this.mapEl = document.querySelector('.js-map')

        if(this.mapEl) {
            this.map = new google.maps.Map(this.mapEl, {
                zoom: 10,
                scrollwheel: false,
                center: new google.maps.LatLng(this.props.crimeLocation.lat, this.props.crimeLocation.lng)
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.crimeDate == this.props.crimeDate
    }

    componentDidUpdate(prevProps) {
        this.clearAllMarkers()
        this.createMapMarkers()
        this.map.fitBounds(this.bounds)
        this.createMarkerClusters()
    }

    createMapMarkers() {
        if(!this.props.crimes || this.props.crimes.length < 1) { return }
        this.markers = []
        this.bounds = new google.maps.LatLngBounds()

        console.log(this.props.crimes)
        this.props.crimes.forEach(function iterateResults(crime, index) {
            if(!crime.location) { return }

            let location = {
                    lng: parseFloat(crime.location.longitude),
                    lat: parseFloat(crime.location.latitude)
                },
                marker = new google.maps.Marker({
                    position: location
                })

            marker.setMap(this.map)
            this.markers.push(marker)
            this.bounds.extend(new google.maps.LatLng(marker.position.lat(), marker.position.lng()))
        }.bind(this))
    }

    createMarkerClusters() {
        if(!this.markers || this.markers.length < 1) { return }
        this.markerClusterer = new MarkerClusterer(this.map, this.markers, {
            styles: [{
                height: 30,
                width: 30,
                url: "",
                textColor: 'white',
                textSize: 10
            }]
        })
    }

    clearAllMarkers() {
        if(this.markerClusterer) {
            this.markerClusterer.removeMarkers(this.markers)
        }
        if(this.markers && this.markers.length) {
            this.markers.forEach(function iterateMarkers(marker) {
                marker.setMap(null)
            })
            this.markers = []
            this.bounds = new google.maps.LatLngBounds(null)
        }
    }

    render() {
        return (
            <div className="js-map" style={ {height: '600px'} }></div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        crimes: state.appReducer.crimes,
        crimeDate: state.appReducer.crimeDate,
        crimeLocation: {
            lat: state.appReducer.crimeLocation.lat,
            lng: state.appReducer.crimeLocation.lng
        }
    }
}

export default connect(mapStateToProps)(CrimeMap)
