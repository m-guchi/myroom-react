import React, { useState, useEffect } from 'react'
import ChartTime from './chartTime';
import ChartDay from './chartDay';
import ChartYear from './chartYear';
import ChartMonth from './chartMonth';
import TopCard from './topCard';

import axios from "axios"


import { Grid, Paper } from '@mui/material';


export default function App (props) {

    const [data1dAgo, setData1dAgo] = useState(null)
    const [datalast, setDataLast] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    const [dataToday, setDataToday] = useState(null)
    const [data1w, setData1w] = useState(null)

    const [data1d, setData1d] = useState(null)
    const [data2d, setData2d] = useState(null)
    const [data2m, setData2m] = useState(null)
    const [data1y, setData1y] = useState(null)

    useEffect(() => {
        fetchAllData()
    },[])

    const handleLoad = () => {
        resetAllData()
        fetchAllData()
    }


    const resetAllData = () => {
        setData1dAgo(null)
        setDataLast(null)
        setWeatherData(null)
        setDataToday(null)
        setData1w(null)
        setData1d(null)
        setData2d(null)
        setData2m(null)
        setData1y(null)
    }
    const fetchAllData = () => {
        fetch1dAgoData()
        fetchLastData()
        fetchWeatherData()
        fetchTodayData()
        fetch1wData()
        fetch1dData()
        fetch2dData()
        fetch2mData()
        fetch1yData()
    }

    const fetch1dAgoData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht_data?minute=1440&range=20")
        .then(function(res) {
            if(res.data.ok){
                setData1dAgo(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const fetchLastData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht_data?last=1") //最新データ
        .then(function(res) {
            if(res.data.ok){
                setDataLast(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const fetchWeatherData = () => {
        axios.get("https://weather.tsukumijima.net/api/forecast/city/270000")
        .then(res => {
            setWeatherData(res.data.forecasts)
        })
    }

    const fetchTodayData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht_time?std=00&begin=0&end=0") //今日
        .then(function(res) {
            if(res.data.ok){
                setDataToday(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const formatDay = (date) => {
        const datetime = new Date(date)
        const yyyy = ('000' + datetime.getFullYear()).slice(-4)
        const mm =('00' + datetime.getMonth()+1).slice(-2)
        const dd =('00' + datetime.getDate()).slice(-2)
        return yyyy+"-"+mm+"-"+dd;
    }
    const fetch1wData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht_time?std=00&begin=7&end=1") //1週間前～昨日
        .then(function(res) {
            if(res.data.ok){
                const data1wObj = {}
                res.data.data.forEach(val => {
                    if(!(formatDay(val["datetime"]) in data1wObj)){ data1wObj[formatDay(val["datetime"])] = Array() }
                    data1wObj[formatDay(val["datetime"])].push(val)
                })
                setData1w(data1wObj)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }

    const fetch1dData = () => { //12時間前～現在
        axios.get(process.env.REACT_APP_API_URL+"/dht_time?std=half&begin=1&end=0")
        .then(function(res) {
            if(res.data.ok){
                setData1d(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const fetch2dData = () => { //36時間前～12時間前
        axios.get(process.env.REACT_APP_API_URL+"/dht_time?std=half&begin=2&end=1")
        .then(function(res) {
            if(res.data.ok){
                setData2d(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const fetch2mData = () => { //2ヶ月
        axios.get(process.env.REACT_APP_API_URL+"/dht_daily?std=half&begin=60")
        .then(function(res) {
            if(res.data.ok){
                setData2m(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }
    const fetch1yData = () => { //1年分
        axios.get(process.env.REACT_APP_API_URL+"/dht_daily?std=half&begin=365")
        .then(function(res) {
            if(res.data.ok){
                setData1y(res.data.data)
            }else{
                console.error(res.data.error)
            }
        })
        .catch(function(err) {
            console.error(err)
        })
    }



    return(
        <Grid container spacing={1} sx={{padding: 1}}>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <TopCard
                        data1dAgo={data1dAgo}
                        datalast={datalast}
                        weatherData={weatherData}
                        handleLoad={handleLoad}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartTime data1d={data1d} data2d={data2d}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartDay dataToday={dataToday} data1w={data1w}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartMonth data={data2m} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartYear data={data1y} />
                </Paper>
            </Grid>
        </Grid >
    )
}