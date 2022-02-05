import react, { useState } from "react";
import { Link } from "react-router-dom";
import style from './Nav.module.css'
import { searchCity } from "../redux/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import location from '../images/location.png'

export default function Nav() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    function handleOnChange(event) {
        setInput(event.target.value)
    }

    function handleOnClick() {
        dispatch(searchCity(input))
        setInput('')
    }

    const [state, setState] = useState({
        lon: 0,
        lat: 0
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    lon: position.coords.longitude,
                    lat: position.coords.latitude
                })
            },
            function (error) {
                console.log(error)
            },
            { enableHighAccuracy: true }
        )
    }, [])

    return (
        <div className={style.Nav}>
            <Link to='/' className={style.Text}> Home</Link>
            <div className={style.location}>
                <img src={location} width='20px' height='20px' className={style.icono} />
                <Link to={`/locate/${state.lon}/${state.lat}`} className={style.Text2}><p className={style.textoo}>Weather in your Location</p></Link>
            </div>
            <input type="text" onChange={(event) => handleOnChange(event)} value={input} className={style.input} />
            <button onClick={() => handleOnClick()} className={style.button}>Search</button>

        </div>
    )
}

