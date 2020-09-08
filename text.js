function getPercent(format) {
    const formats = ['doc', 'docx', 'rtf', undefined];
    if (formats.includes(format)) {
        return 1;
    }
    return 1.2;
}

function getPrice(size, lang, format) {
    const priceMap = {
        UA: 0.05,
        RU: 0.05,
        EN: 0.12,
    };

    if (!priceMap.hasOwnProperty(lang)) {
        throw new Error(`Unknown language: ${lang}`)
    }
    if (size <= 0) {
        return 0;
    }
    const price = priceMap[lang];
    return Math.max(1000, size) * price * getPercent(format);
}

function getTime(size, lang, format) {
    const speedMap = {
        UA: 1333,
        RU: 1333,
        EN: 333,
    }
    const HOUR = 60 * 60 * 1000;
    const HALF_HOUR = HOUR / 2;
    if (!speedMap.hasOwnProperty(lang)) {
        throw new Error(`Unknown language: ${lang}`)
    }
    if (size <= 0) {
        return 0;
    }
    const speed = speedMap[lang];
    let ms = Math.max(HOUR * getPercent(format),
        (HALF_HOUR + (size / speed) * 3600 * 1000)) * getPercent(format);
    let n = ms / 1000;
    let h = Math.floor(n / 60 / 60);
    let m = (n / 60 / 60) - h;
    m = Math.floor(m * 60);
    return(`${h}:${m}`);
}

function deadlineDate(startTime, duration) {
    let moment = require('moment');
    let durationIsLeft = duration;
    const resultDate = moment(startTime);

    while (true) {
        const currentDayTenMs = moment(resultDate)
            .startOf('day')
            .hour(10)
            .minute(0)
            .valueOf();

        const currentDaySevenMs = moment(resultDate)
            .startOf('day')
            .hour(19)
            .minute(0)
            .valueOf();

        if (resultDate.valueOf() > currentDaySevenMs) {
            resultDate.add(1, 'days').set({hours: 10, minutes: 0});
            continue;
        }
        if (resultDate.day() === 6 || resultDate.day() === 0) {
            resultDate.add(1, 'days').set({hours: 10, minutes: 0});
            continue;
        }
        if (resultDate.valueOf() < currentDayTenMs) {
            resultDate.set({hours: 10, minutes: 0});
        }

        const leftToEndDay = currentDaySevenMs - resultDate.valueOf();
        if (durationIsLeft < leftToEndDay) {
            return resultDate.valueOf() + durationIsLeft;
            // return  moment(resultDate.valueOf() + durationIsLeft).format("DD MMM YYYY hh:mm a") ;
        }

        durationIsLeft = durationIsLeft - leftToEndDay;

        resultDate.add(1, 'days').set({ hours: 10, minutes: 0 });
    }
}

function text_edit(size,lang, format) {
    let price = getPrice(size, lang);
    let duration = getTime(size, lang);
    let percent = getPercent(format);
    price *= percent;
    duration *= percent;
    let deadline = deadlineDate(new Date(), duration);
    duration /= 1000;
    let h = Math.floor(duration / 60 / 60);
    let m = (duration / 60 / 60) - h;
    m = Math.floor(m * 60);
    console.log(`Price: ${price}, Time: ${h}:${m}, Deadline: ${deadline}`)
}
// text_edit(5100, 'UA', 'doc');
// let ms = getTime(3330, 'EN', 'pdf');
// let n = ms / 1000;
// let h = Math.floor(n / 60 / 60);
// let m = (n / 60 / 60) - h;
// m = Math.floor(m * 60);
// console.log(`${h}:${m}`);
// console.log(ms);

module.exports = {
    getPrice,
    getTime,
    getPercent,
    deadlineDate
};
