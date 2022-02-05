import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCityByCoords } from '../redux/action.js';
import DetailLocate from './DetailLocate';

export default function Locate({ match }) {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('effect')
        dispatch(getCityByCoords(match.params.lon, match.params.lat))
    })

    return (
        <DetailLocate />
    )
}