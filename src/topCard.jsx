import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Card, CircularProgress, Typography, Grid, Alert, Divider, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';


const yesAvg = (date) => {
    const num = date.length
    let temp = 0
    let humid = 0
    let press = 0
    date.forEach((val) => {
        temp += val["temperature"]
        humid += val["humidity"]
        press += val["pressure"]
    })
    return [temp/num, humid/num, press/num]
}


export default function TopCard (props) {

    if (props.data1dAgo===null || props.datalast===null || props.weatherData===null) return(
        <Card sx={{
            width: "100%",
            margin: "0 auto",
        }}>
            <Typography align='center' variant='h6' color="#3AABD2">最新情報</Typography>
            <Box sx={{
                textAlign: "center",
                padding: "50px 0"
            }}>
                <CircularProgress />
            </Box>
        </Card>
    )


    const fc = props.weatherData
    const todayTelop = fc[0]["telop"]??"-"
    const todayMinTemp = fc[0]["temperature"]["min"]["celsius"]??"-"
    const todayMaxTemp = fc[0]["temperature"]["max"]["celsius"]??"-"
    const TommorowTelop = fc[1]["telop"]??"-"
    const TommorowMinTemp = fc[1]["temperature"]["min"]["celsius"]??"-"
    const TommorowMaxTemp = fc[1]["temperature"]["max"]["celsius"]??"-"

    const lastData = props.datalast[0]
    const [yesTemp, yesHumid, yesPress] = yesAvg(props.data1dAgo)

    const tempDiff = (lastData["temperature"]-yesTemp).toFixed(2);
    const humidDiff = (lastData["humidity"]-yesHumid).toFixed(2);
    const pressDiff = (lastData["pressure"]-yesPress).toFixed(0);

    const lastUpdateDiff = (new Date()).getTime() - (new Date(lastData["datetime"])).getTime()
    const isUpdateError = lastUpdateDiff > 35*60*1000
    const isUpdateWarning = !isUpdateError && lastUpdateDiff > 15*60*1000


    return(
        <Card sx={{
            width: "100%",
            margin: "0 auto"
        }}>
            <Typography align='center' variant='h6' color="#3AABD2">
                最新情報
            </Typography>
            <Grid container spacing={2} sx={{padding: 1, marginBottom: "8px"}}>
                <Grid item xs={6} sm={4}>
                    <Card>
                        <Typography
                            align='center'
                            variant='subtitle1'
                            color="#1A73E8"
                        >温度</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"22px"}}
                        >{lastData["temperature"]} ℃</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"14px", color:"#666"}}
                        >昨日比: {tempDiff>0?"+"+tempDiff:tempDiff} ℃</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Card>
                        <Typography
                            align='center'
                            variant='subtitle1'
                            color="#CC7903"
                        >湿度</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"22px"}}
                        >{lastData["humidity"]} ％</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"14px", color:"#666"}}
                        >昨日比: {humidDiff>0?"+"+humidDiff:humidDiff} ポイント</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <Typography
                            align='center'
                            variant='subtitle1'
                            color="#30A650"
                        >気圧</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"22px"}}
                        >{lastData["pressure"]/100} hPa</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"14px", color:"#666"}}
                        >昨日比: {pressDiff>0?"+"+pressDiff/100:pressDiff/100} hPa</Typography>
                    </Card>
                </Grid>
                {(isUpdateError || isUpdateWarning) &&
                <Grid item xs={12}>
                    <Alert severity={isUpdateError ? "error" : "warning"}>データが更新されていません！ (最終更新: {lastData["datetime"]})</Alert>
                </Grid>
                }
            </Grid >
            <Divider />
            <Typography align='center' sx={{fontSize:"16px", marginTop:"6px"}}>
            天気予報(大阪)
            </Typography>
            <Grid container spacing={2} sx={{padding: 1, marginBottom: "4px"}}>
                <Grid item xs={6}>
                    <Card>
                        <Typography
                            align='center'
                            variant='subtitle1'
                            sx={{fontSize:"16px"}}
                            color="primary"
                        >今日</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"21px"}}
                        >{todayTelop}</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"16px", color:"#444"}}
                        >{todayMaxTemp}℃ / {todayMinTemp}℃</Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <Typography
                            align='center'
                            variant='subtitle1'
                            sx={{fontSize:"16px"}}
                            color="secondary"
                        >明日</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"21px"}}
                        >{TommorowTelop}</Typography>
                        <Typography
                            align='center'
                            sx={{fontSize:"16px", color:"#444"}}
                        >{TommorowMaxTemp}℃ / {TommorowMinTemp}℃</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{margin:"6px auto 12px", textAlign:"center"}}>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={props.handleLoad}
                >画面更新</Button>
            </Box>
        </Card>
    )
}