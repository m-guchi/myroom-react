import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:"center",
        margin:"5rem auto",
        padding:"1rem",
        width:"90vw",
        backgroundColor:"#cbddf5"
    },
    text: {
        fontSize:"2rem"
    }
}));

export default function TopDisplay () {
    const classes = useStyles();
    const [temperature, setTemperature] = useState();
    const [humidity, setHumidity] = useState();

    useEffect(() => {
        fetchLastDHT();
        // setTemperature(32.1)
        // setHumidity(43.2)
    },[])

    const fetchLastDHT = () => {
        axios.get("./api/dht/last")
        .then(function(res) {
            console.log(res.data)
            setTemperature(res.data.temp)
            setHumidity(res.data.humid)
        })
        .catch(function(err) {
            console.error(err)
        })
    }

    return(
        <div className={classes.root}>
            <div className={classes.text}>温度：{temperature}℃</div>
            <div className={classes.text}>湿度：{humidity}％</div>
        </div>
    )
}