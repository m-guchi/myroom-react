import React, { useState, useEffect } from 'react'
import TopDisplay from './TopDisplay';
import Chart from './chart';
import ChartSelect from './chartSelect'
import ListTable from './listTable';
import axios from "axios"

export default function Home() {
    const testData = {"time":"2021-06-16 22:50:05","temp":32.1,"humid":57,"press":99234.21}
    const testListData = [{"time":"2021-06-17 00:20:05","temp":30.800000000000001,"humid":55,"press":99843.800000000003},{"time":"2021-06-17 00:10:05","temp":31.100000000000001,"humid":55,"press":99843.300000000003},{"time":"2021-06-17 00:00:12","temp":31,"humid":55,"press":99849},{"time":"2021-06-16 23:50:05","temp":31.100000000000001,"humid":55,"press":99854.300000000003},{"time":"2021-06-16 23:40:05","temp":30.800000000000001,"humid":54,"press":99870.800000000003},{"time":"2021-06-16 23:30:05","temp":31,"humid":55,"press":99855.800000000003},{"time":"2021-06-16 23:20:05","temp":30.699999999999999,"humid":55,"press":99855.600000000006},{"time":"2021-06-16 23:10:06","temp":30.399999999999999,"humid":56,"press":99847.100000000006},{"time":"2021-06-16 23:00:09","temp":30.5,"humid":56,"press":99852.100000000006},{"time":"2021-06-16 22:50:05","temp":29.800000000000001,"humid":59,"press":99863},{"time":"2021-06-16 22:40:05","temp":29.5,"humid":60,"press":99852.199999999997},{"time":"2021-06-16 22:30:05","temp":29.399999999999999,"humid":60,"press":99853.399999999994},{"time":"2021-06-16 22:20:06","temp":29.399999999999999,"humid":60,"press":100000},{"time":"2021-06-16 22:15:51","temp":29.5,"humid":60,"press":100000},{"time":"2021-06-16 22:04:56","temp":29.699999999999999,"humid":60,"press":100000},{"time":"2021-06-16 21:50:05","temp":29.5,"humid":60,"press":100000},{"time":"2021-06-16 21:30:05","temp":29.699999999999999,"humid":58,"press":100000},{"time":"2021-06-16 21:20:05","temp":29.5,"humid":58,"press":100000},{"time":"2021-06-16 21:10:17","temp":29.600000000000001,"humid":59,"press":100000},{"time":"2021-06-16 21:00:06","temp":29.5,"humid":59,"press":100000}]
    const [lastData, setLastData] = useState(null);
    const [listData, setListData] = useState(null);
    const [chartData, setChartData] = useState(null);
    // const [lastData, setLastData] = useState(testData);
    // const [listData, setListData] = useState(testListData);
    // const [chartData, setChartData] = useState(testListData);

    const [chartFetchNum, setChartFetchNum] = useState(144);
    const handleChartNum = (e) => {
        setChartFetchNum(e.target.value)
    }
    
    useEffect(() => {
        fetchLastDHT();
        fetchDHTList();
        fetchDHTChartList();
    },[])
    useEffect(()=>{
        fetchDHTChartList();
    },[chartFetchNum])

    const fetchLastDHT = () => {
        axios.get("./api/dht/last")
        .then(function(res) {
            setLastData(res.data)
        })
        .catch(function(err) {
            console.error(err)
        })
    }

    const fetchDHTList = () => {
        axios.get("./api/dht?num=72")
        .then(function(res) {
            setListData(res.data)
        })
        .catch(function(err) {
            console.error(err)
        })
    }

    const fetchDHTChartList = () => {
        axios.get("./api/dht?num="+chartFetchNum)
        .then(function(res) {
            setChartData(res.data)
        })
        .catch(function(err) {
            console.error(err)
        })
    }

    if(lastData && listData &&chartData){
        return(
            <div>
                <TopDisplay lastData={lastData}/>
                <ChartSelect data={chartFetchNum} handleChange={handleChartNum} />
                <Chart chartData={chartData} />
                <ListTable listData={listData} />
            </div>
        )
    }else{
        return null
    }
}