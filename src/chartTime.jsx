import React, { useState, useEffect } from 'react'
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Card, Typography } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const formatTime = (date) => {
    const datetime = new Date(date)
    const hh = ('0' + datetime.getHours()).slice(-2)
    const mm =('0' + datetime.getMinutes()).slice(-2)
    return hh+":"+mm;
}


const start2Time = (date1, date2) => {
    const timeStamp1 = new Date(date1).getTime()
    const timeStamp2 = new Date(date2).getTime()
    const second1d = 1000*60*60*24
    if(timeStamp1+second1d === timeStamp2) return timeStamp1
    if(timeStamp1+second1d < timeStamp2) return timeStamp1
    if(timeStamp1+second1d > timeStamp2) return timeStamp2-second1d
}

const generateTimeLabel = (date1, date2) => {
    let startTimeStamp
    if(date2.length<1 && date1.length<1){
        startTimeStamp = 0
    }else if(date2.length<1){
        startTimeStamp = new Date(date1[0]["datetime"]).getTime()
    }else if(date1.length<1){
        startTimeStamp = new Date(date2[0]["datetime"]).getTime()
    }else{
        startTimeStamp = start2Time(date1[0]["datetime"], date2[0]["datetime"])
    }
    const timeStampArr = [...Array(144)].map((_,i) => startTimeStamp+i*600*1000)
    const timeArr = timeStampArr.map(val => {
        const datetime = new Date(val)
        const hh = ('0' + datetime.getHours()).slice(-2)
        const mm =('0' + datetime.getMinutes()).slice(-2)
        return hh+":"+mm;
    })
    return timeArr
}




export default function ChartTime (props) {

    const [data1d, setData1d] = useState(null)
    const [data2d, setData2d] = useState(null)

    useEffect(() => {
        fetch1dData()
        fetch2dData()
    },[])


    const fetch1dData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht?range=1d")
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

    const fetch2dData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht?range=2d")
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


    if(data1d===null || data2d===null) return null

    const label = generateTimeLabel(data1d,data2d)

    const dateTime1dArr = data1d.map(val => formatTime(val["datetime"]))
    const dateTime2dArr = data2d.map(val => formatTime(val["datetime"]))


    const dataTemp = {
        datasets: [
            {
                label: "気温",
                data: label.map(val => {
                    const index = dateTime1dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1d[index]["temperature"]}
                }),
                borderColor: "#1A73E8",
                backgroundColor: "#1A73E8"
            },
            {
                label: "気温(昨日)",
                data: label.map(val => {
                    const index = dateTime2dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data2d[index]["temperature"]}
                }),
                borderColor: "#BDD6F7",
                backgroundColor: "#BDD6F7"
            }
        ]
    }
    const optionTemp = {
        scales: {
            y: {
                suggestedMax: 27,
                suggestedMin: 22,
                title: {
                    display: true,
                    text: "（℃）",
                    align: "end",
                    padding: 2
                }
            },
            x: {
                ticks: {
                    autoSkipPadding: 24,
                    maxRotation: 0
                }
            }
        },
        plugins:{
            legend: {
                display: false
            }
        },
        elements:{
            line:{
                tension: 0.8,
                spanGaps: true
            },
            point: {
                pointStyle: false,
            }
        }
    }


    const dataHumid = {
        datasets: [
            {
                label: "湿度",
                data: label.map(val => {
                    const index = dateTime1dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1d[index]["humidity"]}
                }),
                borderColor: "#CC7903",
                backgroundColor: "#CC7903"
            },
            {
                label: "湿度(昨日)",
                data: label.map(val => {
                    const index = dateTime2dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data2d[index]["humidity"]}
                }),
                borderColor: "#EFD6B2",
                backgroundColor: "#EFD6B2"
            }
        ]
    }
    const optionHumid = {
        scales: {
            y: {
                suggestedMax: 50,
                suggestedMin: 40,
                title: {
                    display: true,
                    text: "（％）",
                    align: "end",
                    padding: 2
                }
            },
            x: {
                ticks: {
                    autoSkipPadding: 24,
                    maxRotation: 0
                }
            }
        },
        plugins:{
            legend: {
                display: false
            }
        },
        elements:{
            line:{
                tension: 0.8,
                spanGaps: true
            },
            point: {
                pointStyle: false,
            }
        }
    }


    
    const dataPress = {
        datasets: [
            {
                label: "気圧",
                data: label.map(val => {
                    const index = dateTime1dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1d[index]["pressure"]/100}
                }),
                borderColor: "#30A650",
                backgroundColor: "#30A650"
            },
            {
                label: "気圧(昨日)",
                data: label.map(val => {
                    const index = dateTime2dArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data2d[index]["pressure"]/100}
                }),
                borderColor: "#B6E0C2",
                backgroundColor: "#B6E0C2"
            }
        ]
    }
    const optionPress = {
        scales: {
            y: {
                suggestedMax: 1010,
                suggestedMin: 1005,
                title: {
                    display: true,
                    text: "（hPa）",
                    align: "end",
                    padding: 2
                },
            },
            x: {
                ticks: {
                    autoSkipPadding: 24,
                    maxRotation: 0
                }
            }
        },
        plugins:{
            legend: {
                display: false
            }
        },
        elements:{
            line:{
                tension: 0.8,
                spanGaps: true
            },
            point: {
                pointStyle: false,
            }
        }
    }



    return(
        <Card sx={{
            width: "100%",
            // maxWidth: "1000px",
            // minWidth: "400px",
            margin: "0 auto"
        }}>
            <Typography align='center' variant='h6'>過去36時間データ</Typography>
            <Line
                height="40px"
                width="100%"
                data={dataTemp}
                options={optionTemp}
                id="chart-tmp"
            />
            <Line
                height="40px"
                width="100%"
                data={dataHumid}
                options={optionHumid}
                id="chart-hum"
            />
            <Line
                height="40px"
                width="100%"
                data={dataPress}
                options={optionPress}
                id="chart-pre"
            />
        </Card>
    )
}