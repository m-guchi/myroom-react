import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Chart (props) {
    const data = (props.chartData).reduceRight((p, c) => [...p, c], [])
    return(
        <div>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0,40]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" name="温度" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[20,80]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humid" stroke="#56C502" name="湿度" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="95%"height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[95000,105000]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="press" stroke="#F48F16" name="気圧" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}