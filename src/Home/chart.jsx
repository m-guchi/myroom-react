import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Chart (props) {
    const data = (props.chartData).map(val => {
        const press = val.press/100;
        return {...val, "press":press}
    })
    return(
        <div>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={false} reversed/>
                    <YAxis domain={[0,40]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" name="温度" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={false} reversed />
                    <YAxis domain={[20,80]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humid" stroke="#56C502" name="湿度" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="95%"height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={false} reversed />
                    <YAxis domain={[980,1020]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="press" stroke="#F48F16" name="気圧" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}