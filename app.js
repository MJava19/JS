function textEdit(exp, lang, size, date) {
  let free = 0;
  if (date.getHours() < 10) {
      date.setHours(10);
      date.setMinutes(0);
  }
  let min;
  let freeMinutes = 0;



  const UA_RU_Price = 0.05;
  const EN_Price = 0.12;

  let time = 0;
  const UA_RU_Time = 1333;
  const EN_Time = 333;
  if (lang === 'UA' || lang === 'RU') {
      lang = UA_RU_Price;
      time = UA_RU_Time;
  }
  else if (lang === 'EN') {
      lang = EN_Price;
      time = EN_Time;
  }
  else {
      console.log("Error language! Please change correct language.")
      return;
  }
  let price = lang * size;
  time = Math.round(size / time);
  if (time < 1) {
      time = 1;
  }
  time = 60 * (time + 0.5);
  if (exp !== '.doc' && exp !== '.docx' && exp !== '.rtf') {
      price = price + (price / 100 * 20);
      time = time + (time / 100 * 20);
  }
  if (price < lang * 1000) {
      price = lang * 1000;
  }

    // Дедлайн
    // console.log(time / 60);
    while (time > 0) {
        while (freeMinutes <= 0) {
            if (date.getDay() === 6) {
                date.setDate(date.getDate() + 2);
                date.setHours(10);
                date.setMinutes(0);
            } else if (date.getDay() === 0) {
                date.setDate(date.getDate() + 1);
                date.setHours(10);
                date.setMinutes(0);
            }
            if (date.getHours() === 19) {
                date.setHours(20);
            }
            if (date.getHours() !== 18) {
                freeMinutes = 60 * (19 - date.getHours());
            } else
            if (date.getMinutes() !== 0) {
                freeMinutes = freeMinutes + (60 - date.getMinutes());
            }
            if (freeMinutes < 0) {
                freeMinutes = 0;
                date.setDate(date.getDate() + 1);
                date.setHours(10);
                date.setMinutes(0);
            }
        }
        time = time - freeMinutes;
        free = freeMinutes;
        freeMinutes = 0;
        if (time > 0) {
            date.setDate(date.getDate() + 1);
            date.setHours(10);
            date.setMinutes(0);
        }
        min = date.getMinutes();
    }

    time = time + free + min;
    let hour = time / 60;
    date.setHours(Math.trunc(hour) + date.getHours());
    date.setMinutes(time % 60);
    date.setSeconds(0);

return date.toString();
//   console.log('Price: ' + price.toFixed(2) + ' грн');
//   console.log('Deadline: ' + date);
}
// textEdit('.doc', 'EN', 1000, new Date());

module.exports = textEdit;