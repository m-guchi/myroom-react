import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TopDisplay from './TopDisplay';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#222'
    },
}));

export default function Home (props) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <TopDisplay/>
        </div>
    )
}