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
    const YY = ('000' + datetime.getFullYear()).slice(-4)
    const MM = ('0' + String(Number(datetime.getMonth())+1)).slice(-2)
    const DD =('0' + datetime.getDate()).slice(-2)
    return YY+"-"+MM+"-"+DD;
}



const generateTimeLabel = (date) => {
    const startTimeStamp = (new Date(date[0]["date"])).getTime()
    const timeStampArr = [...Array(366)].map((_,i) => startTimeStamp+i*24*60*60*1000)
    const timeArr = timeStampArr.map(val => {
        const datetime = new Date(val)
        const YY = ('000' + datetime.getFullYear()).slice(-4)
        const MM = ('0' + String(Number(datetime.getMonth())+1)).slice(-2)
        const DD =('0' + datetime.getDate()).slice(-2)
        return YY+"-"+MM+"-"+DD;
    })
    return timeArr
}




export default function ChartYear (props) {

    const [data1y, setData1y] = useState(null)

    useEffect(() => {
        fetch1yData()
    },[])


    const fetch1yData = () => {
        axios.get(process.env.REACT_APP_API_URL+"/dht?range=1y")
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


    if(data1y===null) return null

    const label = generateTimeLabel(data1y)

    const dateTime1yArr = data1y.map(val => formatTime(val["date"]))


    const dataTemp = {
        datasets: [
            {
                label: "気温(平均)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["temp_avg"]}
                }),
                borderColor: "#1A73E8",
                backgroundColor: "#1A73E8"
            },
            {
                label: "気温(最高)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["temp_max"]}
                }),
                borderColor: "#BDD6F7",
                backgroundColor: "#BDD6F7"
            },
            {
                label: "気温(最低)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["temp_min"]}
                }),
                borderColor: "#BDD6F7",
                backgroundColor: "#BDD6F7"
            }
        ]
    }
    const optionTemp = {
        scales: {
            y: {
                suggestedMax: 25,
                suggestedMin: 25,
                title: {
                    display: true,
                    text: "（℃）",
                    align: "end",
                    padding: 2
                }
            },
            x: {
                ticks: {
                    autoSkipPadding: 30,
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
                label: "湿度(平均)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["humid_avg"]}
                }),
                borderColor: "#CC7903",
                backgroundColor: "#CC7903"
            },
            {
                label: "湿度(最高)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["humid_max"]}
                }),
                borderColor: "#EFD6B2",
                backgroundColor: "#EFD6B2"
            },
            {
                label: "湿度(最低)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["humid_min"]}
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
                suggestedMin: 50,
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
                label: "気圧(平均)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["press_avg"]/100}
                }),
                borderColor: "#30A650",
                backgroundColor: "#30A650"
            },
            {
                label: "気圧(最高)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["press_max"]/100}
                }),
                borderColor: "#B6E0C2",
                backgroundColor: "#B6E0C2"
            },
            {
                label: "気圧(最低)",
                data: label.map(val => {
                    const index = dateTime1yArr.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1y[index]["press_min"]/100}
                }),
                borderColor: "#B6E0C2",
                backgroundColor: "#B6E0C2"
            }
        ]
    }
    const optionPress = {
        scales: {
            y: {
                suggestedMax: 1000,
                suggestedMin: 1000,
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
            margin: "0 auto"
        }}>
            <Typography align='center' variant='h6'>過去1年間データ</Typography>
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