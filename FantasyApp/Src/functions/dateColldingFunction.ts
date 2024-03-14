function isTimeColliding(contestData, dataArray) {
    const startingDateTime = new Date(contestData?.startingyear, contestData?.startingmonth - 1, contestData?.startingdate, contestData?.startinghour, contestData?.startingtime);
    const endingDateTime = new Date(contestData?.endingyear, contestData?.endingmonth - 1, contestData?.endingdate, contestData?.endinghour, contestData?.endingtime);

    for (const data of dataArray) {
        const startDate = new Date(data?.startingyear, data?.startingmonth - 1, data?.startingdate, data?.startinghour, data?.startingtime);
        const endDate = new Date(data?.endingyear, data?.endingmonth - 1, data?.endingdate, data?.endinghour, data?.endingtime);

        if (
            (startingDateTime >= startDate && startingDateTime <= endDate) ||  // Check if startingDateTime falls within the interval
            (endingDateTime >= startDate && endingDateTime <= endDate) ||      // Check if endingDateTime falls within the interval
            (startingDateTime <= startDate && endingDateTime >= endDate)      // Check if the interval of startingDateTime to endingDateTime spans the entire duration
        ) {
            return true;  // Collides
        }
    }

    return false;  // Doesn't collide
}

export default isTimeColliding