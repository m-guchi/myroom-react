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
import { color } from './color';
import { option } from './chartOptions';
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

const dataSet = (labelName, xLabel, data1d, data2d, yLabelName, color, div=1) => {
    const dateTime1d = data1d.map(val => formatTime(val["datetime"]))
    const dateTime2d = data2d.map(val => formatTime(val["datetime"]))
    return {
        datasets: [
            {
                label: labelName,
                data: xLabel.map(val => {
                    const index = dateTime1d.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data1d[index][yLabelName]/div}
                }),
                borderColor: color["bold"],
                backgroundColor: color["bold"]
            },
            {
                label: labelName+"(昨日)",
                data: xLabel.map(val => {
                    const index = dateTime2d.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data2d[index][yLabelName]/div}
                }),
                borderColor: color["light"],
                backgroundColor: color["light"]
            }
        ]
    }
}


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

    const dataTemp = dataSet("気温", label, data1d, data2d, "temperature", color["temp"])
    const optionTemp = option("temp")

    const dataHumid = dataSet("湿度", label, data1d, data2d, "humidity", color["humid"])
    const optionHumid = option("humid")

    const dataPress = dataSet("気圧", label, data1d, data2d, "pressure", color["press"],100)
    const optionPress = option("press")


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