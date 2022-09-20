import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysVal: document.querySelector('[data-days]'),
  hoursVal: document.querySelector('[data-hours]'),
  minutesVal: document.querySelector('[data-minutes]'),
  secondsVal: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  value: document.querySelector('.value'),
};
window.addEventListener('load', pageReload);
function pageReload() {}

refs.btnStart.disabled = true;
// переменная на выбранную дату пользователем
let selectedDay = new Date();
// перезагрузка страницы
window.addEventListener('load', pageReload);
function pageReload() {}
// функция приведения данных к двоичному значению
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// обработка на ввод валидной даты в будущем
refs.input.addEventListener('change', onInputClick);
function onInputClick(e) {
  const selectedTime = new Date(e.target.value);
  if (selectedTime.getTime() < Date.now()) {
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  refs.btnStart.disabled = false;
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDay = selectedDates[0];
    console.log(selectedDates[0]);
  },
};
flatpickr(refs.input, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
// создаем функцию выведения таймера
function timeConverter({ days, hours, minutes, seconds }) {
  refs.daysVal.textContent = addLeadingZero(days);
  refs.hoursVal.textContent = addLeadingZero(hours);
  refs.minutesVal.textContent = addLeadingZero(minutes);
  refs.secondsVal.textContent = addLeadingZero(seconds);
}
// xtr
// добавляем событие на кнопку старт
// при клике функция отрабатывает
refs.btnStart.addEventListener('click', onBtnClick);
function onBtnClick(e) {
  intervalId = setInterval(() => {
    const msResult = selectedDay.getTime() - Date.now();
    const timer = convertMs(msResult);
    const { days, hours, minutes, seconds } = timer;
    if (msResult < 1000 || pageReload()) {
      clearInterval(intervalId);
      return;
    }
    timeConverter(timer);
    //Выведение таймера
    // refs.daysVal.textContent = addLeadingZero(days);
    // refs.hoursVal.textContent = addLeadingZero(hours);
    // refs.minutesVal.textContent = addLeadingZero(minutes);
    // refs.secondsVal.textContent = addLeadingZero(seconds);
  }, 1000);
}
