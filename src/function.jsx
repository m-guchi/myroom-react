export const formatDate = (date) => {
    const datetime = new Date(date)
    const YY = ('000' + datetime.getFullYear()).slice(-4)
    const MM = ('0' + String(Number(datetime.getMonth())+1)).slice(-2)
    const DD =('0' + datetime.getDate()).slice(-2)
    return YY+"-"+MM+"-"+DD;
}

export const formatTime = (date) => {
    const datetime = new Date(date)
    const hh = ('0' + datetime.getHours()).slice(-2)
    const mm =('0' + datetime.getMinutes()).slice(-2)
    return hh+":"+mm;
}


export const generateDateLabel = (datesets, datanum) => {
    const startTimeStamp = (new Date(datesets[0]["date"])).getTime()
    const timeStampArr = [...Array(datanum)].map((_,i) => startTimeStamp+i*24*60*60*1000)
    const timeArr = timeStampArr.map(val => {
        const datetime = new Date(val)
        const YY = ('000' + datetime.getFullYear()).slice(-4)
        const MM = ('0' + String(Number(datetime.getMonth())+1)).slice(-2)
        const DD =('0' + datetime.getDate()).slice(-2)
        return YY+"-"+MM+"-"+DD;
    })
    return timeArr
}


const start2Time = (date1, date2) => {
    const timeStamp1 = new Date(date1).getTime()
    const timeStamp2 = new Date(date2).getTime()
    const second1d = 1000*60*60*24
    if(timeStamp1+second1d === timeStamp2) return timeStamp1
    if(timeStamp1+second1d < timeStamp2) return timeStamp1
    if(timeStamp1+second1d > timeStamp2) return timeStamp2-second1d
}

export const generateTimeLabelfrom2Data = (date1, date2) => {
    let startTimeStamp
    if(date2.length<1 && date1.length<1){
        startTimeStamp = 0
    }else if(date2.length<1){
        startTimeStamp = new Date(date1[0]["datetime"]).getTime()
    }else if(date1.length<1){
        startTimeStamp = new Date(date2[0]["datetime"]).getTime()
    }else{
        startTimeStamp = start2Time(date1[0]["datetime"], date2[0]["datetime"])
    }
    const timeStampArr = [...Array(144)].map((_,i) => startTimeStamp+i*600*1000)
    const timeArr = timeStampArr.map(val => {
        const datetime = new Date(val)
        const hh = ('0' + datetime.getHours()).slice(-2)
        const mm =('0' + datetime.getMinutes()).slice(-2)
        return hh+":"+mm;
    })
    return timeArr
}

export const generateTimeLabelfrom0 = () => {
    const startTimeStamp = new Date('2020/01/01 00:00:00').getTime()
    const timeStampArr = [...Array(144)].map((_,i) => startTimeStamp+i*600*1000)
    const timeArr = timeStampArr.map(val => {
        const datetime = new Date(val)
        const hh = ('0' + datetime.getHours()).slice(-2)
        const mm =('0' + datetime.getMinutes()).slice(-2)
        return hh+":"+mm;
    })
    return timeArr
}