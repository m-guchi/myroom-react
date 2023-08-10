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

const todayDataSet = (labelName, data, xLabel, yLabelName, color, div=1) => {
    const dateTime = data.map(val => formatTime(val["datetime"]))
    return {
        label: labelName,
        data: xLabel.map(val => {
            const index = dateTime.indexOf(val)
            if(index===-1) return {x:val, y:null}
            return {x:val, y:data[index][yLabelName]/div}
        }),
        borderColor: color,
        backgroundColor: color
    }
}
const weekDataSet = (key,labelName, data, xLabel, yLabelName, color, div=1) => {
    const dateTimeLabel = data[key].map(val => formatTime(val["datetime"]))
    return {
        label: labelName+"("+key+")",
        data: xLabel.map(val => {
            const index = dateTimeLabel.indexOf(val)
            if(index===-1) return {x:val, y:null}
            return {x:val, y:data[key][index][yLabelName]/div}
        }),
        borderColor: color,
        backgroundColor: color
    }
}

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


    const dataTempDatasets = []
    dataTempDatasets.push(todayDataSet("気温(今日)",dataToday,label,"temperature",color["temp"]["bold"]))
    Object.keys(data1w).forEach(key => {
        dataTempDatasets.push(weekDataSet(key,"気温",data1w,label,"temperature",color["temp"]["light"]))
    })
    const dataTemp = { datasets: dataTempDatasets }
    const optionTemp = option("temp")


    const dataHumidDatasets = []
    dataHumidDatasets.push(todayDataSet("湿度(今日)",dataToday,label,"humidity",color["humid"]["bold"]))
    Object.keys(data1w).forEach(key => {
        dataHumidDatasets.push(weekDataSet(key,"湿度",data1w,label,"humidity",color["humid"]["light"]))
    })
    const dataHumid = { datasets: dataHumidDatasets }
    const optionHumid = option("humid")


    const dataPressDatasets = []
    dataPressDatasets.push(todayDataSet("気圧(今日)",dataToday,label,"pressure",color["press"]["bold"],100))
    Object.keys(data1w).forEach(key => {
        dataPressDatasets.push(weekDataSet(key,"気圧",data1w,label,"pressure",color["press"]["light"],100))
    })

    const dataPress = { datasets: dataPressDatasets }
    const optionPress = option("press")



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