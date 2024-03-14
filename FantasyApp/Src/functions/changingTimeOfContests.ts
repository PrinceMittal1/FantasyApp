const changingTimeOfContests = (contest, index, timetoChange, data) => {
    if (timetoChange == "end") {
        let day = data?.getDay() === 0 ?
            "Sunday" :
            data?.getDay() === 1 ? "Monday" :
                data?.getDay() === 2 ? "Tuesday" :
                    data?.getDay() === 3 ? "Wednesday" :
                        data?.getDay() === 4 ? "Thursday" :
                            data?.getDay() === 1 ? "Friday" :
                                "Saturday"

        contest.day = day,
            contest.endinghour = data.getHours() % 12 < 10 ? `0${data.getHours() % 12}` : data.getHours() % 12,
            contest.endingtime = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes(),
            contest.endingschedule = data.getHours() > 11 ? "PM" : "AM"

        return contest
    }
    else {
        let day = data?.getDay() === 0 ?
            "Sunday" :
            data?.getDay() === 1 ? "Monday" :
                data?.getDay() === 2 ? "Tuesday" :
                    data?.getDay() === 3 ? "Wednesday" :
                        data?.getDay() === 4 ? "Thursday" :
                            data?.getDay() === 1 ? "Friday" :
                                "Saturday"

            contest.day = day,
            contest.startinghour = data.getHours() % 12 < 10 ? `0${data.getHours() % 12}` : data.getHours() % 12,
            contest.startingtime = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes(),
            contest.startingschedule = contest.getHours() > 11 ? "PM" : "AM"

            return contest
    }
}

export { changingTimeOfContests }