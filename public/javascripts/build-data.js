const buildData = (data) => {
    let answer = [];
    for (let i = 0; i < data.length; i++) {
        let timeData = data[i]['validTime'];
        let timeValue = ((timeData.split("/")[0]).split("+")[0]);
        let dataValue = data[i]['value'];
        let forecastDuration = parseInt((timeData.split("/")[1]).split("")[2]);
        if (forecastDuration !== 1) {
            let string = timeValue.split("-");
            let month = parseInt(string[1]);
            let year = parseInt(string[0])
            let day = parseInt(string[2].split("T")[0]);
            let hour = parseInt(string[2].split("T")[1]);
            for (let j = 0; j < forecastDuration; j++) {
                if (j === 0) {
                    answer.push({ time: timeValue, value: dataValue })
                } else {
                    if (hour < 10 && day < 10) {
                        let newTime = year.toString() + "-" + month.toString() + "-" + "0" + day.toString() + "T" + "0" + hour.toFixed() + ":00:00";
                        answer.push({ time: newTime, value: dataValue })
                    } else if (hour < 10 && day > 10) {
                        let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + "0" + hour.toFixed() + ":00:00";
                        answer.push({ time: newTime, value: dataValue });
                    } else if (hour > 10 && day < 10) {
                        let newTime = year.toString() + "-" + month.toString() + "-" + "0" + day.toString() + "T" + hour.toFixed() + ":00:00";
                        answer.push({ time: newTime, value: dataValue });
                    } else if (hour > 10 && day > 10) {
                        let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + hour.toFixed() + ":00:00";
                        answer.push({ time: newTime, value: dataValue });
                    }
                }
                hour += 1;
                if (hour === 24) {
                    hour = 0;
                    day += 1;
                }
                if (day === 32) {
                    day = 1;
                    month += 1;
                }
                if (month === 13) {
                    month = 1;
                    year += 1;
                }
            }
        } else {
            answer.push({ time: timeValue, value: dataValue })
        }
    }
    return (answer);
}

export default buildData;