import React, { useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import win from '../images/wind.png'
// import visib from '../../media/details/witness.png'
import gauge from '../images/pressure.png'
import humidi from '../images/humidity.png'
// import NextDays from './NextDays';
import MapView from './MapView';
import { useSelector } from 'react-redux';
// import loaderr from '../../media/loader2.gif'
import { Link } from 'react-router-dom';
// import back from '../../media/atras.png'
import NextDays from './NextDaysCard';
import { useDispatch } from 'react-redux';
import { getCityByCoords } from '../redux/action';
import style from './DetailLocate.module.css'
//Styled-components


const Body = styled.div`
    height: auto;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    margin: 10px;
`;

const ContainerOne = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ContainerTwo = styled.div`
    width: 80%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    margin-right: 200px;
`;

const DivLocation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 30px;
    font-family: 'verdana';
`;

const H1 = styled.h1`
    margin: 0;
    font-weight: 800;
    font-family: 'verdana';
`;

const Time = styled.h6`
    font-weight: 400;
    text-align: center;
    font-size: 15px;
    font-family: 'verdana';
    text-align: left;
    color: #C6C6C6;
    margin: 3px;
`;

const DivTemp = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const Temp = styled.h1`
    color: black;
    font-family: 'Ubuntu', sans-serif;
    font-size: 80px;
    margin: 0;
    padding: 0  0 0 15px;
`;

const DivTempInfo = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
`;

const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 50px;
`;

const Description = styled.h2`
    color: black;
    margin: 0;
    font-family: 'verdana';
    font-weight: 800;
    &::first-letter{
        text-transform: uppercase;
    }
`;

const Feel = styled.h4`
    margin-top: 10px;
    font-family: 'verdana';
    color: #C6C6C6;
`;

const P = styled.p`
    font-family: 'verdana';
    color: #C6C6C6;
    margin: 0;
    font-weight: 800;
`;

const DivGeneral = styled.div`
    display: flex;
    flex-direction: column;
`;

const DivIcons = styled.div`
    display: flex;
    flex-direction: row;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 20px;
    width: auto;
`;

const DivP = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
`;

const DivAux = styled.div`
    display: flex;
    flex-direction: column;
`;

const DivNextDays = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    padding: 10px;
`;

const DivLoader = styled.div`
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DivButton = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
`;

const Button = styled(Link)`
    color: black;
    font-family: 'verdana';
    font-size: 20px;
    font-weight: 800;
    margin: 20px 0 0 20px;
    margin: 0;
`;


export default function DetailLocate() {

    const details = useSelector(store => store.detailsLocate)
    const nextDaysInfo = useSelector(state => state.nextdays)
    const dispatch = useDispatch()
    
    //HORA
    const timezoneInMinutes = (details.timezone) / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");


    return (
        <Body>
            {
                !details.name ? <DivLoader><h1>LOADING</h1></DivLoader>
                    : <ContainerInfo>
                        <DivButton>
                            {/* <img src={back} width='10px' height='10px' /> */}
                            <Button to='/'>Back</Button>
                        </DivButton>
                        <ContainerOne>
                            <DivAux>
                                <DivLocation>
                                    <H1>{details.name}</H1>
                                    <Time>{currTime}</Time>
                                </DivLocation>
                                <DivGeneral>
                                    <DivTempInfo>
                                        <DivTemp>

                                            <img src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`} width='130px' height='130px' />
                                            <Temp>{`${Math.round(details.main.temp)}°c`}</Temp>
                                        </DivTemp>
                                        <DivInfo>
                                            <Description>{details.weather[0].description}</Description>
                                            <Feel>Feels like: {Math.round(details.main.feels_like)}°</Feel>
                                            <P>The high will be {Math.round(details.main.temp_max)}°. </P>
                                        </DivInfo>
                                    </DivTempInfo>
                                    <DivIcons>
                                        <IconContainer>
                                            <img src={win} width='30px' height='30px' />
                                            <DivP><P>Wind</P><P>{Math.round(details.wind.speed)} m/s</P></DivP>
                                        </IconContainer>
                                        <IconContainer>
                                            {/* <img src={visib} width='30px' height='30px' /> */}
                                            {/* <DivP><P>Visibility</P><P>{details.visibility / 1000} km</P></DivP> */}
                                        </IconContainer>
                                        <IconContainer>
                                            <img src={gauge} width='30px' height='30px' />
                                            <DivP><P>Pressure</P><P>{details.main.pressure} hPa</P></DivP>
                                        </IconContainer>
                                        <IconContainer>
                                            <img src={humidi} width='30px' height='30px' />
                                            <DivP><P>Humidity</P><P>{details.main.humidity} %</P></DivP>
                                        </IconContainer>
                                    </DivIcons>
                                </DivGeneral>
                            </DivAux>
                            <div>
                                <div className={style.nextdays}>
                                    {
                                        nextDaysInfo && nextDaysInfo.daily.map(d => {
                                            return <NextDays pop={d.pop} time={d.dt} icon={d.weather[0].icon} min={Math.round(d.temp.min)} max={Math.round(d.temp.max)} />
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </ContainerOne>
                        <ContainerTwo>
                            <MapView lat={details.coord.lat} lon={details.coord.lon} />
                        </ContainerTwo>
                    </ContainerInfo>
            }
        </Body>
    )
}