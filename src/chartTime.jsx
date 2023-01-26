import React, { useState, useEffect } from 'react'
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
import { formatTime, generateTimeLabelfrom2Data } from './function';

import { Box, Card, CircularProgress, Typography } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function ChartTime (props) {


    const data1d = props.data1d
    const data2d = props.data2d

    if(data1d===null || data2d===null) return(
        <Card sx={{
            width: "100%",
            margin: "0 auto",
        }}>
            <Typography align='center' variant='h6'>過去36時間データ</Typography>
            <Box sx={{
                textAlign: "center",
                padding: "50px 0"
            }}>
                <CircularProgress />
            </Box>
        </Card>
    )


    const label = generateTimeLabelfrom2Data(data1d,data2d)

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