import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { deleteDetail } from '../redux/action.js';
import { useDispatch } from 'react-redux';
import place from '../images/place.png'
import L from 'leaflet';

//Styled-components

const Map = styled(MapContainer)`
    width: 80vw;
    height: 80vh;
    padding: 0;
    margin-top: 50px;
    margin-left: 10%;
    margin-bottom: 30px
`;

const Asd = styled.div`
    width: 100%;
    height: 100%;
`;

//--------------------------------------


export default function MapView({ lat, lon }) {

    const [view, setView] = useState({
        lat: '',
        lon: ''
    })

    const dispatch = useDispatch();

    useEffect(() => {
        setView({
            lat,
            lon
        })
        return () => {
            dispatch(deleteDetail())
            console.log('se desmonto')
        }
    }, [])

    console.log(typeof (view.lat))
    return (
        <Asd>
            {
                typeof view.lat === 'number'
                    ? <Map center={[view.lat, view.lon]} zoom={9}>
                        
                        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={{ lat: view.lat, lon: view.lon }} icon={L.icon({
                            iconUrl: place,
                            iconRetinaUrl: place,
                            iconSize: [40, 30]

                        }
                        )} />

                    </Map>
                    : <span>ads</span>
            }
        </Asd>

    )
}