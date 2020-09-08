const {
    getPrice,
    getTime,
    getPercent,
    deadlineDate
} = require('./text');

let moment = require('moment');

describe('getPrice', () => {
    test.each`
    size      | language | format    | result
    ${10000}  | ${'UA'}  | ${'doc'}  | ${500}
    ${10000}  | ${'UA'}  | ${'pdf'}  | ${600}
    ${10000}  | ${'EN'}  | ${'doc'}  | ${1200}
    ${10000}  | ${'EN'}  | ${'pdf'}  | ${1440}
    ${10000}  | ${'RU'}  | ${'doc'}  | ${500}
    ${100}    | ${'UA'}  | ${'doc'}  | ${50}
    ${1000}   | ${'RU'}  | ${'docx'} | ${50}
    ${100}    | ${'EN'}  | ${'rtf'}  | ${120}
    `(
        'getPrice',
        ({size, language, format, result}) => {
        expect(getPrice(size, language, format)).toBe(result);
});
});

describe('getTime', () => {
    test.each`
    size      | language | format    | result
    ${2666}   | ${'UA'}  | ${'doc'}  | ${'2:30'}
    ${3330}   | ${'EN'}  | ${'pdf'}  | ${'12:35'}
    ${13330}  | ${'RU'}  | ${'doc'}  | ${'10:30'}
    ${100}    | ${'EN'}  | ${'doc'}  | ${'1:0'}
    `(
        'getTime',
        ({size, language, format, result}) => {
        expect(getTime(size, language, format)).toBe(result);
});
});

describe("getPercent", () => {
    test.each`
    format       | result
    ${'pdf'}     | ${1.2}
    ${'bin'}     | ${1.2}
    ${'doc'}     | ${1}
    ${'docx'}    | ${1}
    ${'rtf'}     | ${1}
    ${undefined} | ${1}
    `(
        'getPercent', ({format, result}) => {
            expect(getPercent(format)).toBe(result);
});
});

describe("deadlineDate", () => {
    test.each`
               startTime               |   duration    |        endDate
      ${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
      ${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
      ${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
      ${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
      ${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
      ${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
      ${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
      ${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
      ${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
      ${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
      ${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
      ${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
      ${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
      ${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
      ${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
    `(
        'deadlineDate',
        ({startTime, duration, endDate}) => {
            const startTimeMs = moment(startTime, 'DD/MM/YYYY HH:mm dddd').valueOf();
            const durationMs = duration * 60 * 60 * 1000;
            const deadlineDateMs = moment(endDate, 'DD/MM/YYYY HH:mm dddd').valueOf();
            expect(deadlineDate(startTimeMs, durationMs)).toBe(deadlineDateMs);
});
});