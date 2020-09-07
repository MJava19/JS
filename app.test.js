const textEdit = require('./app');
const date_end_0 = new Date(2020,8,2,11,30,0);
const date_end_1 = new Date(2020,8,2,13,30,0);
const date_end_2 = new Date(2020,8,2,13,0,0);
const date_end_3 = new Date(2020,8,3,12,24,0);
const date_end_4 = new Date(2020,8,16,10,30,0);
const date_end_5 = new Date(2020,8,2,12,0,0);
const date_end_6 = new Date(2020,8,2,15,54,0);
const date_end_7 = new Date(2020,8,2,11,30,0);
const date_end_8 = new Date(2020,8,2,19,0,0);
const date_end_9 = new Date(2020,8,3,10,30,0);

const date_start_0 = new Date(2020,8,1,20,45,0);
const date_start_1 = new Date(2020,8,2,10,30,0);
const date_start_2 = new Date(2020,8,2,10,0,0);

    test('testing deadline with date_start_0 #0', () => {
        expect(textEdit('.doc', 'UA', 10, date_start_0)).toBe(date_end_0.toString());
    });

    test('test deadline with date_start_0 #1', () => {
        expect(textEdit('.doc', 'EN', 1000, date_start_0)).toBe(date_end_1.toString());
    })

    test('test deadline with date_start_0 #2', () => {
        expect(textEdit('.pdf', 'EN', 500, date_start_0)).toBe(date_end_2.toString());
    })

    test('test deadline with date_start_0 #3', () => {
        expect(textEdit('.pdf', 'RU', 12000, date_start_0)).toBe(date_end_3.toString());
    })

    test('test deadline with date_start_1 #4', () => {
        expect(textEdit('.doc', 'UA', 120000, date_start_1)).toBe(date_end_4.toString());
    })

    test('test deadline with date_start_1 #5', () => {
        expect(textEdit('.doc', 'UA', 120, date_start_1)).toBe(date_end_5.toString());
    })

    test('test deadline with date_start_1 #6', () => {
        expect(textEdit('.pdf', 'EN', 1333, date_start_1)).toBe(date_end_6.toString());
    })

    test('test deadline with date_start_2 #7', () => {
        expect(textEdit('.docx', 'EN', 333, date_start_2)).toBe(date_end_7.toString());
    })

    test('test deadline with date_start_2 #8', () => {
        expect(textEdit('.pdf', 'EN', 2300, date_start_2)).toBe(date_end_8.toString());
    })

    test('test deadline with date_start_2 #9', () => {
        expect(textEdit('.docx', 'EN', 2900, date_start_2)).toBe(date_end_9.toString());
    })