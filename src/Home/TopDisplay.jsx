import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1rem'
    }
}));

export default function TopDisplay (props) {
    const classes = useStyles();
    
    const temperature = props.lastData.temp
    const humidity = props.lastData.humid
    const pressure = (props.lastData.press/100).toFixed(2)

    return(
        <Container className={classes.root} style={{ backgroundColor: '#cfe8fc' }} >
            <Typography align='center' variant='body2'>{props.lastData.time}</Typography>
            <Typography align='center' variant='h6'>温度：{temperature} (℃)</Typography>
            <Typography align='center' variant='h6'>湿度：{humidity} (%)</Typography>
            <Typography align='center' variant='h6'>気圧：{pressure} (hPa)</Typography>
        </Container>
    )
}