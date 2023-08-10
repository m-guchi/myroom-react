export const option = (val) => {
    switch(val){
        case "temp":
            return formatOption(27,22,"（℃）",30)
        case "humid":
            return formatOption(50,40,"（％）",24)
        case "press":
            return formatOption(1007,1003,"（hpa）",24)
        default:
            return false
    }
}

const formatOption = (max, min, text, skip) => {
    return {
        scales: {
            y: {
                suggestedMax: max,
                suggestedMin: min,
                title: {
                    display: true,
                    text: text,
                    align: "end",
                    padding: 2
                }
            },
            x: {
                ticks: {
                    autoSkipPadding: skip,
                    maxRotation: 0
                }
            }
        },
        plugins:{
            legend: {
                display: false
            }
        },
        elements:{
            line:{
                tension: 0.8,
                spanGaps: true
            },
            point: {
                pointStyle: false,
            }
        }
    }
}