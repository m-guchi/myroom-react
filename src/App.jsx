import React, { useState, useEffect } from 'react'
import ChartTime from './chartTime';
import ChartYear from './chartYear';
import ChartMonth from './chartMonth';
import TopCard from './topCard';

import { Grid, Paper } from '@mui/material';


export default function App (props) {

    return(
        <Grid container spacing={1} sx={{padding: 1}}>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <TopCard />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartTime />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartMonth />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={2}>
                    <ChartYear />
                </Paper>
            </Grid>
        </Grid >
    )
}