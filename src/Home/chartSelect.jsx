import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0.5rem 5%'
    },
}));

export default function ChartSelect (props) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">期間</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.data}
                    onChange={props.handleChange}
                >
                <MenuItem value={72}>12時間</MenuItem>
                <MenuItem value={144}>1日</MenuItem>
                <MenuItem value={1008}>7日</MenuItem>
                <MenuItem value={4320}>30日</MenuItem>
            </Select>
        </FormControl>
        </div>
    )
}