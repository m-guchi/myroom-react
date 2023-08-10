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
import { formatDate, generateDateLabel } from './function';

import { Box, Card, Typography, CircularProgress } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const dataSet = (labelName, label, data, indexPrefix, color, div=1) => {
    const dateTime = data.map(val => formatDate(val["date"]))
    return {
        datasets: [
            {
                label: labelName+"(平均)",
                data: label.map(val => {
                    const index = dateTime.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data[index][indexPrefix+"_avg"]/div}
                }),
                borderColor: color["bold"],
                backgroundColor: color["bold"]
            },
            {
                label: labelName+"(最高)",
                data: label.map(val => {
                    const index = dateTime.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data[index][indexPrefix+"_max"]/div}
                }),
                borderColor: color["light"],
                backgroundColor: color["light"]
            },
            {
                label: labelName+"(最低)",
                data: label.map(val => {
                    const index = dateTime.indexOf(val)
                    if(index===-1) return {x:val, y:null}
                    return {x:val, y:data[index][indexPrefix+"_min"]/div}
                }),
                borderColor: color["light"],
                backgroundColor: color["light"]
            }
        ]
    }
}


export default function ChartMonth (props) {

    if(props.data===null) return(
        <Card sx={{
            width: "100%",
            margin: "0 auto",
        }}>
            <Typography align='center' variant='h6'>過去2ヶ月間データ</Typography>
            <Box sx={{
                textAlign: "center",
                padding: "50px 0"
            }}>
                <CircularProgress />
            </Box>
        </Card>
    )

    const label = generateDateLabel(props.data, 90)

    const dataTemp = dataSet("気温", label, props.data, "temp", color["temp"])
    const optionTemp = option("temp")

    const dataHumid = dataSet("湿度", label, props.data, "humid", color["humid"])
    const optionHumid = option("humid")

    const dataPress = dataSet("気圧", label, props.data, "press", color["press"],100)
    const optionPress = option("press")



    return(
        <Card sx={{
            width: "100%",
            margin: "0 auto"
        }}>
            <Typography align='center' variant='h6'>過去2ヶ月間データ</Typography>
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