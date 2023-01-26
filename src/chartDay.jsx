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
import { formatTime, generateTimeLabelfrom0 } from './function';

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


export default function ChartDay (props) {


    const dataToday = props.dataToday
    const data1w = props.data1w

    if(dataToday===null || data1w===null) return(
        <Card sx={{
            width: "100%",
            margin: "0 auto",
        }}>
            <Typography align='center' variant='h6'>過去1週間データ</Typography>
            <Box sx={{
                textAlign: "center",
                padding: "50px 0"
            }}>
                <CircularProgress />
            </Box>
        </Card>
    )


    const label = generateTimeLabelfrom0()
    const dateTimeToday = dataToday.map(val => formatTime(val["datetime"]))


    const dataTempDatasets = []
    dataTempDatasets.push({
        label: "気温(今日)",
        data: label.map(val => {
            const index = dateTimeToday.indexOf(val)
            if(index===-1) return {x:val, y:null}
            return {x:val, y:dataToday[index]["temperature"]}
        }),
        borderColor: "#1A73E8",
        backgroundColor: "#1A73E8"
    })
    Object.keys(data1w).forEach(key => {
        const dateTimeLabel = data1w[key].map(val => formatTime(val["datetime"]))
        dataTempDatasets.push({
            label: "気温("+key+")",
            data: label.map(val => {
                const index = dateTimeLabel.indexOf(val)
                if(index===-1) return {x:val, y:null}
                return {x:val, y:data1w[key][index]["temperature"]}
            }),
            borderColor: "#BDD6F7",
            backgroundColor: "#BDD6F7"
        })
    })

    const dataTemp = {
        datasets: dataTempDatasets
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


    const dataHumidDatasets = []
    dataHumidDatasets.push({
        label: "湿度(今日)",
        data: label.map(val => {
            const index = dateTimeToday.indexOf(val)
            if(index===-1) return {x:val, y:null}
            return {x:val, y:dataToday[index]["humidity"]}
        }),
        borderColor: "#CC7903",
        backgroundColor: "#CC7903"
    })
    Object.keys(data1w).forEach(key => {
        const dateTimeLabel = data1w[key].map(val => formatTime(val["datetime"]))
        dataHumidDatasets.push({
            label: "湿度("+key+")",
            data: label.map(val => {
                const index = dateTimeLabel.indexOf(val)
                if(index===-1) return {x:val, y:null}
                return {x:val, y:data1w[key][index]["humidity"]}
            }),
            borderColor: "#EFD6B2",
            backgroundColor: "#EFD6B2"
        })
    })

    const dataHumid = {
        datasets: dataHumidDatasets
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


    const dataPressDatasets = []
    dataPressDatasets.push({
        label: "気圧(今日)",
        data: label.map(val => {
            const index = dateTimeToday.indexOf(val)
            if(index===-1) return {x:val, y:null}
            return {x:val, y:dataToday[index]["pressure"]/100}
        }),
        borderColor: "#30A650",
        backgroundColor: "#30A650"
    })
    Object.keys(data1w).forEach(key => {
        const dateTimeLabel = data1w[key].map(val => formatTime(val["datetime"]))
        dataPressDatasets.push({
            label: "気圧("+key+")",
            data: label.map(val => {
                const index = dateTimeLabel.indexOf(val)
                if(index===-1) return {x:val, y:null}
                return {x:val, y:data1w[key][index]["pressure"]/100}
            }),
            borderColor: "#B6E0C2",
            backgroundColor: "#B6E0C2"
        })
    })
    
    const dataPress = {
        datasets: dataPressDatasets
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
            <Typography align='center' variant='h6'>過去1週間データ</Typography>
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