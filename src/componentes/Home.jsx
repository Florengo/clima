import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Card from "./Card";
import style from './Home.module.css'

export default function Home() {

//jjj
    const cities = useSelector(state => state.cities)

    let emptyHome = cities.length
    return (
        <div className={style.home}>
            {cities && cities.map(e => {
                return < Card info={e} />

            })}
            {
                !emptyHome ?<div className={style.planet}> <img src="https://i.pinimg.com/originals/0d/c9/68/0dc968448592a7d533096b74c263cc40.gif" alt="" width='320px' height='320px'/> <h3>  Search a city to start.</h3></div>: <p></p>
            }
        </div>
    )
}